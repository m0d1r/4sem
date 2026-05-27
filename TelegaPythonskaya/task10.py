import asyncio
import re
from urllib.parse import urljoin
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import BufferedInputFile
from aiogram.client.session.aiohttp import AiohttpSession
import aiohttp
from bs4 import BeautifulSoup

PROXY_URL = "http://127.0.0.1:10801"
TOKEN = "8443159745:AAHRuwgiNvV4kGi7Of65BUxWNKQ4NW8R_pw"

session = AiohttpSession(proxy=PROXY_URL)
bot = Bot(token=TOKEN, session=session)
dp = Dispatcher()

BASE_URL = "https://books.toscrape.com/"

async def fetch_page(session, url):
    async with session.get(url) as resp:
        return await resp.text()

def parse_price(price_str):
    match = re.search(r'[\d.]+', price_str)
    if match:
        return float(match.group())
    return None

async def get_book_description(session, book_url):
    full_url = urljoin(BASE_URL, book_url)
    html = await fetch_page(session, full_url)
    soup = BeautifulSoup(html, 'html.parser')
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if meta_desc and meta_desc.get('content'):
        return meta_desc['content'].strip()
    desc_p = soup.select_one('article.product_page p')
    if desc_p:
        return desc_p.text.strip()
    return ''

async def get_first_books(max_pages=3):
    books = []
    async with aiohttp.ClientSession() as aio_session:
        current_url = urljoin(BASE_URL, 'catalogue/page-1.html')
        pages_processed = 0
        while current_url and pages_processed < max_pages:
            print(f"Загрузка страницы {pages_processed+1}: {current_url}")
            html = await fetch_page(aio_session, current_url)
            soup = BeautifulSoup(html, 'html.parser')
            articles = soup.select('article.product_pod')
            print(f"Найдено книг на странице: {len(articles)}")
            for idx, article in enumerate(articles):
                title_tag = article.select_one('h3 a')
                name = title_tag.get('title', '') if title_tag else ''
                rel_link = title_tag.get('href', '') if title_tag else ''
                price_tag = article.select_one('p.price_color')
                price_str = price_tag.text.strip() if price_tag else ''
                price = parse_price(price_str)
                img_tag = article.select_one('img')
                img_src = img_tag.get('src', '') if img_tag else ''
                if img_src.startswith('../../../'):
                    img_src = img_src.replace('../../../', '')
                img_url = urljoin(BASE_URL, img_src)
                print(f"  Получение описания для {idx+1}: {name}")
                description = await get_book_description(aio_session, rel_link)
                books.append({
                    'name': name,
                    'description': description,
                    'price': price,
                    'img_url': img_url
                })
            next_button = soup.select_one('li.next a')
            if next_button:
                next_link = next_button.get('href')
                current_url = urljoin(current_url, next_link)
                pages_processed += 1
            else:
                current_url = None
    return books

@dp.message(Command("price"))
async def cmd_price(message: types.Message):
    args = message.text.split(maxsplit=1)
    if len(args) < 2:
        await message.answer("Укажите цену. Пример: /price 25.99")
        return
    try:
        target_price = float(args[1])
    except ValueError:
        await message.answer("Цена должна быть числом.")
        return

    await message.answer("Ищу подходящую книгу... (это займёт несколько секунд)")
    try:
        books = await get_first_books(max_pages=3)
        print(f"Всего собрано книг: {len(books)}")
    except Exception as e:
        print(f"Ошибка при сборе данных: {e}")
        await message.answer(f"Ошибка при получении данных с сайта: {e}")
        return

    if not books:
        await message.answer("Не удалось найти книги на сайте.")
        return

    best = None
    best_diff = None
    for b in books:
        if b['price'] is None:
            continue
        diff = abs(b['price'] - target_price)
        if best_diff is None or diff < best_diff:
            best_diff = diff
            best = b
        elif diff == best_diff:
            if b['name'] < best['name']:
                best = b

    if best is None:
        await message.answer("Не удалось найти книгу с подходящей ценой.")
        return

    async with aiohttp.ClientSession() as img_session:
        try:
            async with img_session.get(best['img_url']) as resp:
                if resp.status == 200:
                    img_data = await resp.read()
                    photo = BufferedInputFile(img_data, filename="book.jpg")
                else:
                    photo = None
        except Exception as e:
            print(f"Ошибка загрузки изображения: {e}")
            photo = None

    caption = f"Название: {best['name']}\nОписание: {best['description']}\nЦена: {best['price']}"
    if photo:
        await message.answer_photo(photo, caption=caption)
    else:
        await message.answer(caption)

async def main():
    print("Бот запущен...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())