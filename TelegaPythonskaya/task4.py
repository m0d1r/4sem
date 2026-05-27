import asyncio
import sys
import ast

async def sowing(*candidates):
    async def fertilize(plant):
        print(f"7. Application of fertilizers for {plant}")
        await asyncio.sleep(3 / 1000)
        print(f"7. Fertilizers for the {plant} have been introduced")

    async def treat(plant):
        print(f"8. Treatment of {plant} from pests")
        await asyncio.sleep(5 / 1000)
        print(f"8. The {plant} is treated from pests")

    async def grow(plant, soak, germ, root):
        print(f"0. Beginning of sowing the {plant} plant")
        print(f"1. Soaking of the {plant} started")
        fert_task = asyncio.create_task(fertilize(plant))
        treat_task = asyncio.create_task(treat(plant))
        await asyncio.sleep(soak / 1000)
        print(f"2. Soaking of the {plant} is finished")
        print(f"3. Shelter of the {plant} is supplied")
        await asyncio.sleep(germ / 1000)
        print(f"4. Shelter of the {plant} is removed")
        print(f"5. The {plant} has been transplanted")
        await asyncio.sleep(root / 1000)
        print(f"6. The {plant} has taken root")
        await asyncio.gather(fert_task, treat_task)
        print(f"9. The seedlings of the {plant} are ready")

    tasks = [asyncio.create_task(grow(plant, soak, germ, root)) for plant, soak, germ, root in candidates]
    await asyncio.gather(*tasks)

if __name__ == "__main__":
    line = sys.stdin.readline().strip()
    if line.startswith("data = "):
        line = line[6:]
    candidates = ast.literal_eval(line)
    asyncio.run(sowing(*candidates))