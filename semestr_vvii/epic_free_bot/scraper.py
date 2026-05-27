import requests
import re

def get_system_requirements(game_name):
    base_url = "https://www.pcgamingwiki.com/w/api.php"
    params = {
        "action": "query",
        "titles": game_name.replace(" ", "_"),
        "prop": "revisions",
        "rvprop": "content",
        "format": "json",
        "redirects": 1
    }
    response = requests.get(base_url, params=params)
    if response.status_code != 200:
        return None
    data = response.json()
    pages = data.get("query", {}).get("pages", {})
    for page_id, page_info in pages.items():
        if page_id == "-1":
            return search_alternative(game_name)
        wikitext = page_info.get("revisions", [{}])[0].get("*", "")
        if not wikitext:
            return None
        break
    else:
        return None

    sys_req_match = re.search(r'==\s*System requirements\s*==(.*?)(?=\n==|\Z)', wikitext, re.DOTALL | re.IGNORECASE)
    if not sys_req_match:
        return None
    sys_req_section = sys_req_match.group(1)

    requirements = {}
    hdd_size = None

    min_params = {}
    rec_params = {}

    min_lines = re.findall(r'^\|\s*min([A-Za-z0-9]+)\s*=\s*(.*?)(?=\n\||\n\}\})', sys_req_section, re.MULTILINE | re.DOTALL)
    for key, value in min_lines:
        val = clean_wikitext(value.strip())
        val = re.sub(r'\|.*$', '', val).strip()
        if val:
            min_params[key.lower()] = val

    rec_lines = re.findall(r'^\|\s*rec([A-Za-z0-9]+)\s*=\s*(.*?)(?=\n\||\n\}\})', sys_req_section, re.MULTILINE | re.DOTALL)
    for key, value in rec_lines:
        val = clean_wikitext(value.strip())
        val = re.sub(r'\|.*$', '', val).strip()
        if val:
            rec_params[key.lower()] = val

    if 'hd' in min_params:
        hdd_size = min_params['hd']
    elif 'hd' in rec_params:
        hdd_size = rec_params['hd']

    if min_params:
        min_text = []
        for key in ['cpu', 'gpu', 'ram']:
            if key in min_params:
                min_text.append(f"{key.upper()}: {min_params[key]}")
        if min_text:
            requirements['minimal'] = "\n".join(min_text)

    if rec_params:
        rec_text = []
        for key in ['cpu', 'gpu', 'ram']:
            if key in rec_params:
                rec_text.append(f"{key.upper()}: {rec_params[key]}")
        if rec_text:
            requirements['recommended'] = "\n".join(rec_text)

    if hdd_size:
        requirements['hdd'] = hdd_size

    if not requirements:
        return None

    return requirements

def search_alternative(game_name):
    base_url = "https://www.pcgamingwiki.com/w/api.php"
    params = {
        "action": "query",
        "list": "search",
        "srsearch": game_name,
        "format": "json",
        "srlimit": 1
    }
    response = requests.get(base_url, params=params)
    if response.status_code != 200:
        return None
    data = response.json()
    search_results = data.get("query", {}).get("search", [])
    if not search_results:
        return None
    best_title = search_results[0]["title"]
    return get_system_requirements(best_title)

def clean_wikitext(text):
    text = re.sub(r"''+", "", text)
    text = re.sub(r"\[\[(?:[^]|]*\|)?([^]]+)\]\]", r"\1", text)
    text = re.sub(r"\{\{[^}]+\}\}", "", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = ' '.join(text.split())
    return text.strip()