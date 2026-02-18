const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//1
function difInst(num1, num2) {
    console.log("1:", num1 - num2);
}

function dif(num1, num2) {
    return(num1 - num2);
}

//2
function is_young(age) {
    if(age < 18){
        console.log("Привет, малыш!")
    }
    else {
        console.log("Здравиствуйте, юноша!")
    }
}

//3
function theMax(n1, n2, n3) {
    console.log(Math.max(n1, n2, n3));
}

//5
function returnU(x, y, z){
    u = (Math.max(x, y) + Math.max(x + y, z))/Math.pow(Math.max(0.5,x + z), 2);    
    console.log(u);
}

//6
function perimetr(...cords) {
    if(cords.length % 2 != 0){
        console.log("Ошибка при вводе координат");
        return;
    }
    result = 0;
    for (i = 0; i+2 < cords.length; i += 2){
        x1 = cords[i];
        y1 = cords[i+1];
        x2 = cords[i+2];
        y2 = cords[i+3];
        console.log(x1, x2, y1, y2);
        result += Math.hypot(x2 - x1,y2 - y1)
        console.log(result);
    }
    console.log(cords[0], cords[1], cords[cords.length-2], cords[cords.length-1]);
    result += Math.hypot(cords[0], cords[1], cords[cords.length-2], cords[cords.length-1]);
    return result;
}


//7
function sequenceMember(n) {
    if (n === 1) return 1;
    
    let sum = 0;
    for (let i = 1; i < n; i++) {
        sum += sequenceMember(i);
    }
    return Math.sin(sum);
}

const task0 = () => {
    rl.close();
    process.exit(0);
}

const task1 = () => {
    console.log("task 1");
    num1 = 10;
    num2 = 3;
    difInst(num1, num2);
    console.log("2:", dif(num1, num2));
}

const task2 = () => {
    console.log("task 2");
    age = 18;
    is_young(age);
}

const task3 = () => {
    console.log("task 3");
    n1 = 2;
    n2 = 5;
    n3 = 1;
    theMax(n1, n2, n3);
}

const task4 = () => {
    console.log("task 4");
    console.log("Выведется сначала Локальная, потом Глобальная, т.к. Локальная существует только на время выполнения функции")
}

const task5 = () => {
    console.log("task 5");
    x = 3;
    y = 5;
    z = 4;
    returnU(x, y, z);
}

const task6 = () => {
    console.log("task 6");
    console.log(perimetr(0, 0, 2, 2, 1, 3, 0, 4));
}

const task7 = () => {
    console.log("task 7");
    console.log('n=1:', sequenceMember(1));
    console.log('n=4:', sequenceMember(4));
}

const askTaskNumber = () => {
    rl.question('Введите номер задания (1-7). 0 - чтобы завершить: ', (x) => {
        switch(x) {
            case '0':
                task0();
                return;
            case '1':
                task1();
                askTaskNumber();
                break;
            case '2':
                task2();
                askTaskNumber();
                break;
            case '3':
                task3();
                askTaskNumber();
                break;
            case '4':
                task4();
                askTaskNumber();
                break;
            case '5':
                task5();
                askTaskNumber();
                break;
            case '6':
                task6();
                askTaskNumber();
                break;
            case '7':
                task7();
                askTaskNumber();
                break;
            default:
                console.log("Принимаются только цифры от 1 до 7 включительно. Попробуйте ещё раз.");
                askTaskNumber();
        }
    });
}

askTaskNumber();