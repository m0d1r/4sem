function createAsyncAdder(secondNumber) {
    let count = 0;
    let currentSum = 0;
    let firstCall = true;
    let intervalId = null;

    return new Promise(function(resolve, reject) {
        function add() {
            if (count >= 5) {
                clearInterval(intervalId);
                resolve(currentSum);
                return;
            }

            let firstArg;
            if (firstCall) {
                firstArg = Math.floor(Math.random() * 100);
                currentSum = firstArg;
                firstCall = false;
            } else {
                firstArg = currentSum;
            }

            if (typeof firstArg !== "number" || typeof secondNumber !== "number") {
                clearInterval(intervalId);
                reject("Ошибка: аргумент не является числом");
                return;
            }

            const result = firstArg + secondNumber;
            currentSum = result;
            count++;

            console.log(result);

            if (count >= 5) {
                clearInterval(intervalId);
                resolve(currentSum);
            }
        }

        intervalId = setInterval(add, 2000);
    });
}

createAsyncAdder(5)
    .then(function(finalResult) {
        console.log("Готово: " + finalResult);
    })
    .catch(function(error) {
        console.log(error);
    });

createAsyncAdder("abc")
    .then(function(finalResult) {
        console.log("Готово: " + finalResult);
    })
    .catch(function(error) {
        console.log(error);
    });