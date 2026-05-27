import requests
from config import RAWG_API_KEY

def search_game(game_name):
    url = "https://api.rawg.io/api/games"
    params = {
        "key": RAWG_API_KEY,
        "search": game_name,
        "page_size": 1
    }
    response = requests.get(url, params=params)
    if response.status_code != 200:
        return None
    data = response.json()
    results = data.get("results", [])
    if not results:
        return None
    game = results[0]
    info = {
        "title": game.get("name", "Неизвестно"),
        "description": game.get("description_raw", "Описание отсутствует"),
        "rating": game.get("rating", "Нет рейтинга"),
        "released": game.get("released", "Неизвестно"),
        "platforms": [p["platform"]["name"] for p in game.get("platforms", [])[:3]]
    }
    return info