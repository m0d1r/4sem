import asyncio
import time
from aiogram import Bot, Dispatcher
from aiogram.filters import Command
from aiogram.types import Message
from aiogram.client.session.aiohttp import AiohttpSession
from config import BOT_TOKEN, PROXY_URL
from epic_api import get_current_free_games, get_upcoming_free_games
from scraper import get_system_requirements
from rawg_api import search_game
from logger import log_user_action

if PROXY_URL:
    session = AiohttpSession(proxy=PROXY_URL)
    bot = Bot(token=BOT_TOKEN, session=session)
else:
    bot = Bot(token=BOT_TOKEN)

dp = Dispatcher()

@dp.message(Command("start"))
async def cmd_start(message: Message):
    user_id = message.from_user.id
    log_user_action(user_id, "start", "пользователь запустил бота")
    await message.answer("Привет! Бот для бесплатных игр.\n/free_now — текущие раздачи\n/upcoming — будущие раздачи\n/info <название> — информация об игре\n/requirements <название> — системные требования")

@dp.message(Command("free_now"))
async def cmd_free_now(message: Message):
    user_id = message.from_user.id
    log_user_action(user_id, "free_now", "запрос текущих раздач")
    games = get_current_free_games()
    if not games:
        await message.answer("Сейчас нет бесплатных игр.")
        log_user_action(user_id, "free_now", "результат: нет игр")
        return
    for game in games:
        text = f"{game['title']}\n{game['description']}\n{game['url']}"
        await message.answer(text)
    log_user_action(user_id, "free_now", f"показано {len(games)} игр")

@dp.message(Command("upcoming"))
async def cmd_upcoming(message: Message):
    user_id = message.from_user.id
    log_user_action(user_id, "upcoming", "запрос будущих раздач")
    games = get_upcoming_free_games()
    if not games:
        await message.answer("Нет будущих раздач.")
        log_user_action(user_id, "upcoming", "результат: нет игр")
        return
    for game in games:
        text = f"{game['title']}\n{game['description']}\n{game['url']}"
        await message.answer(text)
    log_user_action(user_id, "upcoming", f"показано {len(games)} игр")

@dp.message(Command("info"))
async def cmd_info(message: Message):
    user_id = message.from_user.id
    args = message.text.split(maxsplit=1)
    if len(args) < 2:
        await message.answer("Укажи название игры. Пример: /info The Witcher 3")
        log_user_action(user_id, "info", "ошибка: не указано название")
        return
    game_name = args[1]
    log_user_action(user_id, "info", f"поиск игры: {game_name}")
    await message.answer(f"Ищу информацию о {game_name}...")
    game_info = search_game(game_name)
    if not game_info:
        await message.answer("Не удалось найти информацию об игре.")
        log_user_action(user_id, "info", f"не найдено: {game_name}")
        return
    text = f"Название: {game_info['title']}\n"
    text += f"Рейтинг: {game_info['rating']}\n"
    text += f"Дата выхода: {game_info['released']}\n"
    text += f"Платформы: {', '.join(game_info['platforms'])}\n"
    text += f"Описание: {game_info['description'][:500]}..."
    await message.answer(text)
    log_user_action(user_id, "info", f"успешно: {game_info['title']}")

@dp.message(Command("requirements"))
async def cmd_requirements(message: Message):
    user_id = message.from_user.id
    args = message.text.split(maxsplit=1)
    if len(args) < 2:
        await message.answer("Укажи название игры. Пример: /requirements The Witcher 3")
        log_user_action(user_id, "requirements", "ошибка: не указано название")
        return
    game_name = args[1]
    log_user_action(user_id, "requirements", f"поиск требований: {game_name}")
    await message.answer(f"Ищу требования для {game_name}...")
    time.sleep(1)
    reqs = get_system_requirements(game_name)
    if not reqs:
        await message.answer("Не удалось найти системные требования.")
        log_user_action(user_id, "requirements", f"не найдены: {game_name}")
        return
    answer_parts = []
    if "minimal" in reqs:
        answer_parts.append(f"Минимальные:\n{reqs['minimal']}")
    if "recommended" in reqs:
        answer_parts.append(f"Рекомендуемые:\n{reqs['recommended']}")
    if "hdd" in reqs:
        answer_parts.append(f"Место на диске: {reqs['hdd']}")
    await message.answer("\n\n".join(answer_parts))
    log_user_action(user_id, "requirements", f"найдены требования для {game_name}")

@dp.message()
async def unknown(message: Message):
    user_id = message.from_user.id
    log_user_action(user_id, "unknown", message.text)
    await message.answer("Неизвестная команда. Напиши /start")

async def main():
    print("Бот запущен")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())