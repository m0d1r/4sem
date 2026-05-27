import asyncio
from datetime import datetime
from aiogram import Bot, Dispatcher
from aiogram.filters import Command
from aiogram.types import Message, ReplyKeyboardMarkup, KeyboardButton
from aiogram.client.session.aiohttp import AiohttpSession

PROXY_URL = "http://127.0.0.1:10801"
TOKEN = "8443159745:AAHRuwgiNvV4kGi7Of65BUxWNKQ4NW8R_pw"

session = AiohttpSession(proxy=PROXY_URL)
bot = Bot(token=TOKEN, session=session)
dp = Dispatcher()

active_timers = {}

main_keyboard = ReplyKeyboardMarkup(
    keyboard=[[KeyboardButton(text="/dice")], [KeyboardButton(text="/timer")]],
    resize_keyboard=True
)

dice_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="1d6")],
        [KeyboardButton(text="2d6")],
        [KeyboardButton(text="1d20")],
        [KeyboardButton(text="Назад")]
    ],
    resize_keyboard=True
)

timer_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="30 секунд")],
        [KeyboardButton(text="1 минута")],
        [KeyboardButton(text="5 минут")],
        [KeyboardButton(text="Назад")]
    ],
    resize_keyboard=True
)

timer_close_keyboard = ReplyKeyboardMarkup(
    keyboard=[[KeyboardButton(text="/close")]],
    resize_keyboard=True
)

@dp.message(Command("start"))
async def cmd_start(message: Message):
    await message.answer("Выберите действие:", reply_markup=main_keyboard)

@dp.message(Command("dice"))
async def cmd_dice(message: Message):
    await message.answer("Выберите кубик:", reply_markup=dice_keyboard)

@dp.message(Command("timer"))
async def cmd_timer(message: Message):
    await message.answer("Выберите время:", reply_markup=timer_keyboard)

@dp.message(lambda m: m.text == "Назад")
async def back_to_main(message: Message):
    if message.chat.id in active_timers:
        active_timers[message.chat.id].cancel()
        del active_timers[message.chat.id]
    await message.answer("Выберите действие:", reply_markup=main_keyboard)

@dp.message(lambda m: m.text == "1d6")
async def roll_d6(message: Message):
    import random
    result = random.randint(1, 6)
    await message.answer(f"🎲 Выпало: {result}", reply_markup=dice_keyboard)

@dp.message(lambda m: m.text == "2d6")
async def roll_2d6(message: Message):
    import random
    r1 = random.randint(1, 6)
    r2 = random.randint(1, 6)
    await message.answer(f"🎲 Выпало: {r1} и {r2} (сумма: {r1+r2})", reply_markup=dice_keyboard)

@dp.message(lambda m: m.text == "1d20")
async def roll_d20(message: Message):
    import random
    result = random.randint(1, 20)
    await message.answer(f"🎲 Выпало: {result}", reply_markup=dice_keyboard)

def seconds_from_text(text: str) -> int:
    if text == "30 секунд":
        return 30
    elif text == "1 минута":
        return 60
    elif text == "5 минут":
        return 300
    return 0

@dp.message(lambda m: m.text in ["30 секунд", "1 минута", "5 минут"])
async def start_timer(message: Message):
    seconds = seconds_from_text(message.text)
    if seconds == 0:
        return

    if message.chat.id in active_timers:
        active_timers[message.chat.id].cancel()

    async def timer_task(chat_id, secs, text):
        await asyncio.sleep(secs)
        await bot.send_message(chat_id, f"{text} истекло")
        if chat_id in active_timers:
            del active_timers[chat_id]

    task = asyncio.create_task(timer_task(message.chat.id, seconds, message.text))
    active_timers[message.chat.id] = task

    await message.answer(f"Засек {message.text}", reply_markup=timer_close_keyboard)

@dp.message(Command("close"))
async def close_timer(message: Message):
    if message.chat.id in active_timers:
        active_timers[message.chat.id].cancel()
        del active_timers[message.chat.id]
        await message.answer("Таймер сброшен", reply_markup=main_keyboard)
    else:
        await message.answer("Нет активного таймера", reply_markup=main_keyboard)

async def main():
    print("Бот запущен...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())