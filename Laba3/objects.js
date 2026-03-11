const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const task0 = () => {
    rl.close();
    process.exit(0);
}

const task1 = () => {
    console.log("task 1");
    let user = [];
    user["name"] = "John";
    user["surname"] = "Smith";
    user["name"] = "Pete";
    delete user["name"];Q
}

const task2 = () => {
    console.log("task 2");
    let myBrowser = {
    name: "Microsoft Internet Explorer",
    version: "9.0"
    };

    for (let key in myBrowser) {
        console.log(myBrowser[key]);
    }
}

function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

const task3 = () => {
    console.log("task 3");
    let emptyObject = {};
    let nonEmptyObject = { name: "John"};
    console.log(isEmpty(emptyObject));
    console.log(isEmpty(nonEmptyObject));
}

const task4 = () => {
    console.log("task 4");
    const user = {
    name: "John"
    };
    // это будет работать?
    user.name = "Pete";
    //будет

    // а это?
    user = 123;
    // не будет
}

function multiplyNumeric(obj) {
    for (let key in obj) {
        if (typeof obj[key] == 'number') {
            obj[key] *= 2;
        }
    }
}

const task5 = () => {
    console.log("task 5");
    let man = {
    yearsOld: 20,
    name: "Apostol"
    };
    multiplyNumeric(man);
    console.log(man);
}

let calculator = {
    x: NaN,
    y: NaN,
    read(a, b) {
        this.x = a;
        this.y = b;
    },
    sum() {
        console.log(this.x + this.y)
    },
    mul() {
        console.log(this.x * this.y)
    }
}

const task6 = () => {
    console.log("task 6");
    calculator.read(6, 7);
    calculator.sum();
    calculator.mul();
}

let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    
    down() {
        this.step--;
        return this;
    },
    
    showStep() {
        console.log(this.step);
        return this;
    }
};

const task7 = () => {
    console.log("task 7");
    ladder.up().up().down().showStep().down().showStep(); // выводит 1 затем 0
}

function Browser(name, version) {
    this.name = name;
    this.version = version;
    this.aboutBrowser = function() {
        console.log(this.name, " - ", this.version);
    };
}

const task8 = () => {
    console.log("task 8");
    let myBrowser = new Browser("Microsoft Internet Explorer", "9.0");
    console.log("name:", myBrowser.name);
    console.log("version:", myBrowser.version);
    myBrowser.aboutBrowser();
}

function Сотрудник(name, dept, phoneNumber, salary) {
    this.name = name;
    this.dept = dept;
    this.phoneNumber = phoneNumber;
    this.salary = salary;
    
    this.displayInfo = function() {
        console.log("Name: ", this.name);
        console.log("Department: ", this.dept);
        console.log("Phone: ", this.phoneNumber);
        console.log("Salary: ", this.salary);
    };
}

const task9 = () => {
    console.log("task 9");
    let employee = new Сотрудник(
    "Ivan Ivanov",
    "Development",
    "+78005353535",
    750000
    );
    employee.displayInfo();
}

function Calculator(){
    this.a = 0;
    this.b = 0;
    
    this.read = function(a, b) {
    this.a = a;
    this.b = b;
    };
    this.sum = function() {
        return this.a + this.b;
    };
    this.mul = function() {
        return this.a * this.b;
    };
}

const task10 = () => {
    console.log("task 10");
    let calculator = new Calculator();
    calculator.read(6, 9);
    console.log(calculator.sum());
    console.log(calculator.mul());
}

function Accumulator(startingValue){
    this.value = startingValue;
    this.read = function(a) {
        this.value += a;
    }
}

const task11 = () => {
    console.log("task 11");
    let accumulator = new Accumulator(1); // начальное значение 1
    accumulator.read(10); // прибавляет 10 к текущему значению
    accumulator.read(5); // прибавляет 5 к текущему значению
    console.log(accumulator.value); // выведет 16
}
const askTaskNumber = () => {
    rl.question('Введите номер задания (1-11). 0 - чтобы завершить: ', (x) => {
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
            default:
                console.log("Принимаются только цифры от 1 до 11 включительно. Попробуйте ещё раз.");
                askTaskNumber();
        }
    });
}

askTaskNumber();