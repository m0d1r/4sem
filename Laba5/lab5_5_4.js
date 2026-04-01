function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncAdder(secondNumber) {
    let count = 0;
    let currentSum = 0;
    let firstCall = true;

    while (count < 5) {
        let firstArg;
        if (firstCall) {
            firstArg = Math.floor(Math.random() * 100);
            currentSum = firstArg;
            firstCall = false;
        } else {
            firstArg = currentSum;
        }

        if (typeof firstArg !== "number" || typeof secondNumber !== "number") {
            throw new Error("Ошибка: аргумент не является числом");
        }

        const result = firstArg + secondNumber;
        currentSum = result;
        count++;

        console.log("Сумма: " + result + ", итерация: " + count);

        if (count < 5) {
            await delay(2000);
        }
    }

    return currentSum;
}

asyncAdder(5)
    .then((finalResult) => {
        console.log("Готово: " + finalResult);
    })
    .catch((error) => {
        console.log(error.message);
    });

asyncAdder("abc")
    .then((finalResult) => {
        console.log("Готово: " + finalResult);
    })
    .catch((error) => {
        console.log(error.message);
    });