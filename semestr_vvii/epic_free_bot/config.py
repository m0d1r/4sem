import os
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
PROXY_URL = os.getenv("PROXY_URL")
RAWG_API_KEY = os.getenv("RAWG_API_KEY")

EPIC_API_URL = "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions"