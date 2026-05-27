import requests
from config import EPIC_API_URL

def _get_games_by_promotion_type(promo_type):
    response = requests.get(EPIC_API_URL)
    data = response.json()
    games = []
    elements = data.get("data", {}).get("Catalog", {}).get("searchStore", {}).get("elements", [])
    for element in elements:
        promotions = element.get("promotions")
        if not promotions:
            continue
        promo_list = promotions.get("promotionalOffers", [])
        upcoming_list = promotions.get("upcomingPromotionalOffers", [])
        if promo_type == "current" and promo_list:
            games.append({
                "title": element["title"],
                "description": element.get("description", "Нет описания"),
                "url": f"https://www.epicgames.com/store/ru/p/{element['productSlug']}"
            })
        elif promo_type == "upcoming" and upcoming_list and not promo_list:
            games.append({
                "title": element["title"],
                "description": element.get("description", "Нет описания"),
                "url": f"https://www.epicgames.com/store/ru/p/{element['productSlug']}"
            })
    return games

def get_current_free_games():
    return _get_games_by_promotion_type("current")

def get_upcoming_free_games():
    return _get_games_by_promotion_type("upcoming")