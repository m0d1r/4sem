function f1(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(x * x);
        }, Math.random() * 100);
    });
}

function f2(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2 * x);
        }, Math.random() * 100);
    });
}

function f3(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(-2);
        }, Math.random() * 100);
    });
}

function f4(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(3);
        }, Math.random() * 100);
    });
}

function f5(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(x);
        }, Math.random() * 100);
    });
}

function f6(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(5);
        }, Math.random() * 100);
    });
}

function computeF(x, n) {
    let result = 0;
    let step = 1;
    let currentValue = x;

    function next() {
        if (step > n) {
            return Promise.resolve(result);
        }

        let func;
        if (step === 1) func = f1;
        else if (step === 2) func = f2;
        else if (step === 3) func = f3;
        else if (step === 4) func = f4;
        else if (step === 5) func = f5;
        else if (step === 6) func = f6;

        return func(currentValue).then((value) => {
            result += value;
            console.log("f" + step + " даёт значение " + value + ", промежуточный результат = " + result);
            step++;
            return next();
        });
    }

    return next();
}

console.log("n = 2");
computeF(3, 2).then((res) => {
    console.log("ответ для F(x): " + res + "\n");

    console.log("n = 4");
    return computeF(3, 4);
}).then((res) => {
    console.log("ответ для F(x): " + res + "\n");

    console.log("n = 6");
    return computeF(3, 6);
}).then((res) => {
    console.log("ответ для F(x): " + res);
});