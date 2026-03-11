function f1(x, callback) {
    setTimeout(() => {
        callback(x * x);
    }, Math.random() * 100);
}

function f2(x, callback) {
    setTimeout(() => {
        callback(2 * x);
    }, Math.random() * 100);
}

function f3(x, callback) {
    setTimeout(() => {
        callback(-2);
    }, Math.random() * 100);
}

function f4(x, callback) {
    setTimeout(() => {
        callback(3);
    }, Math.random() * 100);
}

function f5(x, callback) {
    setTimeout(() => {
        callback(x);
    }, Math.random() * 100);
}

function f6(x, callback) {
    setTimeout(() => {
        callback(5);
    }, Math.random() * 100);
}

function computeF(x, n, onResult) {
    let result = 0;
    let step = 1;
    
    function next() {
        if (step > n) {
            onResult(result);
            return;
        }
        
        let func;
        if (step === 1) func = f1;
        else if (step === 2) func = f2;
        else if (step === 3) func = f3;
        else if (step === 4) func = f4;
        else if (step === 5) func = f5;
        else if (step === 6) func = f6;
        
        func(x, function(value) {
            result += value;
            console.log("f" + step + " даёт значение " + value + ", промежуточный результат = " + result);
            step++;
            next();
        });
    }
    
    next();
}

console.log("n = 2");
computeF(3, 2, function(res) {
    console.log("ответ для F(x): " + res + "\n");
    
    console.log("n = 4");
    computeF(3, 4, function(res) {
        console.log("ответ для F(x): " + res + "\n");
        
        console.log("n = 6");
        computeF(3, 6, function(res) {
            console.log("ответ для F(x): " + res);
        });
    });
});