import asyncio
from aiogram import Bot, Dispatcher
from aiogram.filters import Command, StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import Message, ReplyKeyboardMarkup, KeyboardButton
from aiogram.client.session.aiohttp import AiohttpSession

PROXY_URL = "http://127.0.0.1:10801"
TOKEN = "8443159745:AAHRuwgiNvV4kGi7Of65BUxWNKQ4NW8R_pw"

session = AiohttpSession(proxy=PROXY_URL)
bot = Bot(token=TOKEN, session=session)
dp = Dispatcher()

class MuseumStates(StatesGroup):
    hall1 = State()
    hall2 = State()
    hall3 = State()
    hall4 = State()
    entrance = State()
    exit_state = State() 

descriptions = {
    "entrance": "Добро пожаловать! Пожалуйста, сдайте верхнюю одежду в гардероб!",
    "hall1": "В данном зале представлены древние артефакты эпохи неолита.",
    "hall2": "В данном зале представлены картины эпохи Возрождения.",
    "hall3": "В данном зале представлены скульптуры XIX века.",
    "hall4": "В данном зале представлены современные инсталляции.",
    "exit": "Всего доброго, не забудьте забрать верхнюю одежду в гардеробе!"
}

def get_entrance_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="Войти в зал 1 (древние артефакты)")]],
        resize_keyboard=True
    )

def get_hall1_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="Перейти в зал 2 (картины Возрождения)")],
            [KeyboardButton(text="Выйти из музея")]
        ],
        resize_keyboard=True
    )

def get_hall2_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="Перейти в зал 3 (скульптуры XIX века)")]],
        resize_keyboard=True
    )

def get_hall3_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="Вернуться в зал 1 (древние артефакты)")],
            [KeyboardButton(text="Перейти в зал 4 (современные инсталляции)")]
        ],
        resize_keyboard=True
    )

def get_hall4_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="Вернуться в зал 1 (древние артефакты)")]],
        resize_keyboard=True
    )

def get_exit_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="/start")]],
        resize_keyboard=True
    )

@dp.message(Command("start"))
async def start_cmd(message: Message, state: FSMContext):
    await state.set_state(MuseumStates.entrance)
    await message.answer(descriptions["entrance"], reply_markup=get_entrance_keyboard())

@dp.message(StateFilter(MuseumStates.entrance))
async def entrance_handler(message: Message, state: FSMContext):
    if message.text == "Войти в зал 1 (древние артефакты)":
        await state.set_state(MuseumStates.hall1)
        await message.answer(descriptions["hall1"], reply_markup=get_hall1_keyboard())
    else:
        await message.answer("Пожалуйста, используйте кнопки на клавиатуре.")

@dp.message(StateFilter(MuseumStates.hall1))
async def hall1_handler(message: Message, state: FSMContext):
    if message.text == "Перейти в зал 2 (картины Возрождения)":
        await state.set_state(MuseumStates.hall2)
        await message.answer(descriptions["hall2"], reply_markup=get_hall2_keyboard())
    elif message.text == "Выйти из музея":
        await state.set_state(MuseumStates.exit_state)
        await message.answer(descriptions["exit"], reply_markup=get_exit_keyboard())
    else:
        await message.answer("Пожалуйста, используйте кнопки.")

@dp.message(StateFilter(MuseumStates.hall2))
async def hall2_handler(message: Message, state: FSMContext):
    if message.text == "Перейти в зал 3 (скульптуры XIX века)":
        await state.set_state(MuseumStates.hall3)
        await message.answer(descriptions["hall3"], reply_markup=get_hall3_keyboard())
    else:
        await message.answer("Пожалуйста, используйте кнопки.")

@dp.message(StateFilter(MuseumStates.hall3))
async def hall3_handler(message: Message, state: FSMContext):
    if message.text == "Вернуться в зал 1 (древние артефакты)":
        await state.set_state(MuseumStates.hall1)
        await message.answer(descriptions["hall1"], reply_markup=get_hall1_keyboard())
    elif message.text == "Перейти в зал 4 (современные инсталляции)":
        await state.set_state(MuseumStates.hall4)
        await message.answer(descriptions["hall4"], reply_markup=get_hall4_keyboard())
    else:
        await message.answer("Пожалуйста, используйте кнопки.")

@dp.message(StateFilter(MuseumStates.hall4))
async def hall4_handler(message: Message, state: FSMContext):
    if message.text == "Вернуться в зал 1 (древние артефакты)":
        await state.set_state(MuseumStates.hall1)
        await message.answer(descriptions["hall1"], reply_markup=get_hall1_keyboard())
    else:
        await message.answer("Пожалуйста, используйте кнопки.")

@dp.message(StateFilter(MuseumStates.exit_state))
async def exit_handler(message: Message, state: FSMContext):
    if message.text == "/start":
        await start_cmd(message, state)
    else:
        await message.answer("Нажмите /start, чтобы начать новую экскурсию.")

async def main():
    print("Бот-экскурсовод запущен...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())