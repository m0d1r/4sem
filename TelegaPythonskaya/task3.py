import asyncio
import sys

async def interviews(*candidates):
    async def process(name, prep1, def1, prep2, def2):
        print(f"{name} started the 1 task.")
        await asyncio.sleep(prep1 / 100)
        print(f"{name} moved on to the defense of the 1 task.")
        await asyncio.sleep(def1 / 100)
        print(f"{name} completed the 1 task.")
        print(f"{name} is resting.")
        await asyncio.sleep(5 / 100)
        print(f"{name} started the 2 task.")
        await asyncio.sleep(prep2 / 100)
        print(f"{name} moved on to the defense of the 2 task.")
        await asyncio.sleep(def2 / 100)
        print(f"{name} completed the 2 task.")

    tasks = [asyncio.create_task(process(*c)) for c in candidates]
    await asyncio.gather(*tasks)

if __name__ == "__main__":
    line = sys.stdin.readline().st[('Ivan', 5, 2, 7, 2), ('John', 3, 4, 5, 1), ('Sophia', 4, 2, 5, 1)]rip()
    data = eval(line)
    asyncio.run(interviews(*data))