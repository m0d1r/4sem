function createAsyncFunction(fn, delay) {
    return function (value) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fn(value));
            }, delay);
        });
    };
}

const f1 = createAsyncFunction((x) => x * x, 500);
const f2 = createAsyncFunction((x) => 2 * x, 500);
const f3 = createAsyncFunction((x) => -2, 500);
const f4 = createAsyncFunction((x) => x + 5, 500);
const f5 = createAsyncFunction((x) => x * 3, 500);
const f6 = createAsyncFunction((x) => x - 1, 500);

async function computeF(x, functions) {
    let result = x;
    for (let i = 0; i < functions.length; i++) {
        result = await functions[i](result);
        console.log("Промежуточный результат: " + result);
    }
    return result;
}

async function demonstrate() {
    console.log("a) n = 2, x = 3");
    let res = await computeF(3, [f1, f2]);
    console.log("Result: " + res + "\n");

    console.log("b) n = 4, x = 2");
    res = await computeF(2, [f1, f2, f3, f4]);
    console.log("Result: " + res + "\n");

    console.log("c) n = 6, x = 1");
    res = await computeF(1, [f1, f2, f3, f4, f5, f6]);
    console.log("Result: " + res);
}

demonstrate();