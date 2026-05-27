import asyncio
from datetime import datetime
from aiogram import Bot, Dispatcher
from aiogram.filters import Command
from aiogram.types import Message
from aiogram.client.session.aiohttp import AiohttpSession

PROXY_URL = "http://127.0.0.1:10801"
TOKEN = "8443159745:AAHRuwgiNvV4kGi7Of65BUxWNKQ4NW8R_pw"

session = AiohttpSession(proxy=PROXY_URL)
bot = Bot(token=TOKEN, session=session)
dp = Dispatcher()

@dp.message(Command("time"))
async def cmd_time(message: Message):
    current_time = datetime.now().strftime("%H:%M:%S")
    await message.answer(f"Текущее время: {current_time}")

@dp.message(Command("date"))
async def cmd_date(message: Message):
    current_date = datetime.now().strftime("%Y-%m-%d")
    await message.answer(f"Текущая дата: {current_date}")

async def main():
    print("Бот запущен...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())