import asyncio
import urllib.request
import json
from concurrent.futures import ThreadPoolExecutor

def fetch_ip(url, extract):
    with urllib.request.urlopen(url, timeout=5) as resp:
        data = resp.read().decode()
        return extract(data)

def extract_ipify(data):
    return json.loads(data)["ip"]

def extract_ip_api(data):
    return json.loads(data)["query"]

def extract_ipinfo(data):
    return data.strip()

async def main():
    services = [
        ("https://api.ipify.org?format=json", extract_ipify),
        ("http://ip-api.com/json/", extract_ip_api),
        ("https://ipinfo.io/ip", extract_ipinfo),
    ]

    with ThreadPoolExecutor(max_workers=3) as executor:
        loop = asyncio.get_running_loop()
        tasks = [loop.run_in_executor(executor, fetch_ip, url, ext) for url, ext in services]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        for res in results:
            if isinstance(res, Exception):
                continue
            if res:
                print(res)
                return

if __name__ == "__main__":
    asyncio.run(main())