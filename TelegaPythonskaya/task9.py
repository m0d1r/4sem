import asyncio
import json
import random
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

class QuizStates(StatesGroup):
    waiting_for_answer = State()

def load_questions():
    with open("questions.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    return data["test"]

@dp.message(Command("start"))
async def start_quiz(message: Message, state: FSMContext):
    all_questions = load_questions()
    if len(all_questions) > 10:
        questions = random.sample(all_questions, 10)
    else:
        questions = all_questions[:]
    random.shuffle(questions)
    await state.update_data(questions=questions, current_index=0, correct=0)
    await state.set_state(QuizStates.waiting_for_answer)
    await ask_question(message, state)

async def ask_question(message: Message, state: FSMContext):
    data = await state.get_data()
    questions = data["questions"]
    idx = data["current_index"]
    if idx >= len(questions):
        correct = data["correct"]
        total = len(questions)
        await message.answer(f"Тест завершён! Правильных ответов: {correct} из {total}. Чтобы пройти тест снова, напишите /start")
        await state.clear()
        return
    q = questions[idx]["question"]
    await message.answer(f"Вопрос {idx+1}: {q}")

@dp.message(StateFilter(QuizStates.waiting_for_answer))
async def process_answer(message: Message, state: FSMContext):
    if message.text == "/stop":
        await message.answer("Тест прерван. Напишите /start, чтобы начать заново.")
        await state.clear()
        return

    data = await state.get_data()
    questions = data["questions"]
    idx = data["current_index"]
    correct = data["correct"]

    expected = questions[idx]["response"].strip()
    user_answer = message.text.strip()
    if user_answer == expected:
        correct += 1
        await message.answer("Верно!")
    else:
        await message.answer(f"Неверно. Правильный ответ: {expected}")

    await state.update_data(current_index=idx+1, correct=correct)
    await ask_question(message, state)

@dp.message(Command("stop"))
async def stop_quiz(message: Message, state: FSMContext):
    if await state.get_state() is not None:
        await state.clear()
        await message.answer("Тест прерван. Напишите /start, чтобы начать заново.")
    else:
        await message.answer("Тест не активен. Напишите /start, чтобы начать.")

async def main():
    print("Бот-тестирование запущен...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())