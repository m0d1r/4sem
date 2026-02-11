const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const task1 = () => {
    console.log("task 1");
    let str = "Строка";
    let undif;
    let float = 3.14;
    let bool = true;
    let array = [1, 2, 3];
    console.log("1: ", typeof(str));
    console.log("2: ", typeof(undif));
    console.log("3: ", typeof(float));
    console.log("4: ", typeof(bool));
    console.log("5: ", typeof(array));
}

const task2 = () => {
    console.log("task 2");
    let num_1 = 56;
    let num_2 = 54;
    if (num_1 == num_2) {
        console.log("равна второй")
    }
    if (num_1 < num_2) {
        console.log("меньше второй")
    }
    if (num_1 <= num_2) {
        console.log("меньше или равна второй")
    }
    if (num_1 > num_2) {
        console.log("больше второй")
    }
}

const task3 = () => {
    console.log("task 3");
    let a = false
    let b = null
    let c;
    console.log(a, b, c)
}

const task4 = () => {
    console.log("task 4");
    console.log("1: \n", "1" + 2 + 3); // к строке долбавляются числа, но преобразуются в строку
    console.log("2: \n",1 + 2 + "3"); // сначала вычисляется число, потом добавляется строка
    console.log("3: \n","1" - 2); // "-" принудительно приводит 1 к числу
    console.log("4: \n","1" + - 2); // здесь "-" считается не оператором, а является унарным минусом
    console.log("5: \n","1" + "1" - "1"); // сначала складываются строки, потом как в 3
    console.log("6: \n","foo" + - "bar"); // bar нельзя преобразовать в число, поэтому NaN
    console.log("7: \n",0 == "0");  // 0 = 0
    console.log("8: \n",0.5 + 0.1 == 0.6); // простая арифметическая операция
    console.log("9: \n",0.1 + 0.2 == 0.3); // проблема с плавающей точкой в 0.3
    console.log("10: \n",true + true + true == 3); // true = 1 при преобразовании в число
    console.log("11: \n",true == 1); // нестрогое сравнение преобразует true в число
    console.log("12: \n",true === 1); // типы данных не соответствуют при строгом сравнении
    console.log("13: \n",1 < 2 < 3); // true = 1 < 3
    console.log("14: \n",3 > 2 > 1); // true = 1 (а не >)
    console.log("15: \n",9007199254740991 + 1 == 9007199254740991 + 2); // число упирается в максимум
    console.log("16: \n",Math.sqrt(-1) == Math.sqrt(-1)); // NaN не соответствует ничему
}

const task5 = () => {
    console.log("task 5");
    let str1 = "Кто ";
    let str2 = "ты ";
    let str3 = "такой?";
    let concatenation = str1 + str2 + str3;
    console.log(concatenation);
}

const task6 = () => {
    console.log("task 6");
    let str = "20", a = 5;
    console.log(str + a); // к строке прибавляется число, которое преобразуется к строке
    console.log(str - a); // строка преобразуется в число
    console.log(str * "2"); // строка преобразуется в число
    console.log(str / 2); // строка преобразуется в число
}

const task7 = () => {
    console.log("task 7");
    let a = "12", b = "7.15";
    console.log(a % Number(Math.round(b, 0)))
}

const task8 = () => {
    console.log("task 8");
    x = 3.5;
    console.log((x**x-7*x+10)/(x**x-8*x+12));
}

const task9 = () => {
    console.log("task 9");
    let mail = "sobaka_sobaka.sobaka"
    if (!(mail.includes("@"))) {
        console.log("Внимание! Сбежала собака");
    };
}

// управление потоком

const task10 = () => {
    console.log("task 10");
    let age = 19;
    if (18 <= age & age<= 30) {
        console.log("Для молодёжи")
    }
    else if (1 <= age & age <= 17) {
        console.log("Для детей")
    }
    else console.log("Для всех возрастов")
}

const task11 = () => {
    console.log("task 11");
    let a = 10, b = 13, max = a > b ? a: b;
    console.log(max)
}

const task12 = () => {
    console.log("task 12");
    let num = 3;
    let crow = "ворон";
    let text = "На ветке сидит";
    switch(num){
        case 1:
            console.log(text, num, crow += "a");
            break;
        case 2: case 3: case 4:
            console.log(text, num, crow += "ы");
            break;
        case 5: case 6: case 7: case 8: case 9: case 10:
            console.log(text, num, crow);
            break;
        default:
            console.log("Должно быть число от 1 до 10-и")
    }
        
}

const task13 = () => {
    console.log("task 13");
    let i = 0;
    console.log("while:")
    while (i <= 50){
        if (i % 2 == 1)
        {console.log(i)};
        i++;
    }
    console.log("for:")
    for (j = 0; j <= 50; j++) {
        if (j % 2 == 1)
        {console.log(j)};
    }
}

const task14 = () => {
    console.log("task 14");
    let sum = 0;
    for (j = 1; j <= 15; j++) {
        sum += j;
    }
    console.log(sum - 5 - 7);
}

const task15 = () => {
    console.log("task 15");
    let x = 2, y = 7, cur_x = x;
    while (y > 1){
        cur_x *= x;
        y--
    }
    console.log(cur_x);
}
const task0 = () => {
    rl.close();
    process.exit(0);
}
const askTaskNumber = () => {
    rl.question('Введите номер задания (1-15). 0 - чтобы завершить: ', (x) => {
        switch(x) {
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
            case '8':
                task8();
                askTaskNumber();
                break;
            case '9':
                task9();
                askTaskNumber();
                break;
            case '10':
                task10();
                askTaskNumber();
                break;
            case '11':
                task11();
                askTaskNumber();
                break;
            case '12':
                task12();
                askTaskNumber();
                break;
            case '13':
                task13();
                askTaskNumber();
                break;
            case '14':
                task14();
                askTaskNumber();
                break;
            case '15':
                task15();
                askTaskNumber();
                break;
            case '0':
                task0();
                return;
            default:
                console.log("Принимаются только цифры от 1 до 15 включительно. Попробуйте ещё раз.");
                askTaskNumber();
        }
    });
}

askTaskNumber();