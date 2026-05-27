import asyncio
from aiogram import Bot, Dispatcher
from aiogram.filters import Command
from aiogram.types import Message
from aiogram.client.session.aiohttp import AiohttpSession

PROXY_URL = "http://127.0.0.1:10801"
TOKEN = "8443159745:AAHRuwgiNvV4kGi7Of65BUxWNKQ4NW8R_pw"

session = AiohttpSession(proxy=PROXY_URL)
bot = Bot(token=TOKEN, session=session)
dp = Dispatcher()

@dp.message(Command("start"))
async def cmd_start(message: Message):
    await message.answer("Привет! Я эхо-бот. Отправь любое сообщение!")

@dp.message()
async def echo_message(message: Message):
    await message.answer(f"Я получил сообщение: {message.text}")

async def main():
    print("Бот запущен...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())