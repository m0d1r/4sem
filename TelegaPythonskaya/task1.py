import asyncio

async def factorial_async(name, number):
    f = 1
    for i in range(2, number + 1):
        print(f"Task {name}: Compute factorial({i})...")
        f *= i
        await asyncio.sleep(0)
    print(f"Task {name}: factorial({number}) = {f}")

async def main():
    tasks = [
        asyncio.create_task(factorial_async("A", 15)),
        asyncio.create_task(factorial_async("B", 7)),
        asyncio.create_task(factorial_async("C", 4)),
    ]
    await asyncio.gather(*tasks)

if __name__ == "__main__":
    asyncio.run(main())