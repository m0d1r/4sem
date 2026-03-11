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
    class Clock {
        constructor(hours, minutes, seconds) {
            this.hours = hours;
            this.minutes = minutes;
            this.seconds = seconds;
        }
        showTime() {
            console.log(this.hours, ":", this.minutes, ":", this.seconds);
        }
    }   
    const clock = new Clock(14, 25, 30);
    clock.showTime(); 
}

const task2 = () => {
    console.log("task 2");
    class Animal {
        constructor(name) {
        this.name = name;
        }
    }
    class Rabbit extends Animal {
        constructor(name) {
        super(name);
        this.created = Date.now();
        }
    }
    let rabbit = new Rabbit("Белый кролик");
    console.log(rabbit.name);
}

const task3 = () => {
    console.log("task 3");
    class Clock {
        constructor(template) {
        this.template = template;
        }
        render() {
        let date = new Date();
        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;
        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;
        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;
        let output = this.template
        .replace('h', hours)
        .replace('m', mins)
        .replace('s', secs);
        console.log(output);
        }
        stop() {
        clearInterval(this.timer);
        }
        start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
        }
    }
    let clock = new Cl

    class ExtendedClock extends Clock {
        constructor(template, precision = 1000) {
            super(template);
            this.precision = precision;
        }
        
        start() {
            this.render();
            this.timer = setInterval(() => this.render(), this.precision);
        }
    }
}

const task4 = () => {
    console.log("task 4");
    class Stock {
    constructor() {
        this.boxes = [];
        this.nextId = 0;
    }
    add(w, v) {
        const box = {
            id: this.nextId++,
            w: w,
            v: v
        };
        this.boxes.push(box);
        return box.id;
    }
    getByW(min_w) {
        let selectedIndex = -1;
        let selectedBox = null;
        
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.boxes[i].w >= min_w) {
                if (selectedBox === null || this.boxes[i].w < selectedBox.w) {
                    selectedBox = this.boxes[i];
                    selectedIndex = i;
                }
            }
        }
        
        if (selectedIndex === -1) {
            return -1;
        }
        
        const id = selectedBox.id;
        this.boxes.splice(selectedIndex, 1);
        return id;
    }
    
    getByV(min_v) {
        let selectedIndex = -1;
        let selectedBox = null;
        
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.boxes[i].v >= min_v) {
                if (selectedBox === null || this.boxes[i].v < selectedBox.v) {
                    selectedBox = this.boxes[i];
                    selectedIndex = i;
                }
            }
        }
        
        if (selectedIndex === -1) {
            return -1;
        }
        
        const id = selectedBox.id;
        this.boxes.splice(selectedIndex, 1);
        return id;
    }
}
}

const askTaskNumber = () => {
    rl.question('Введите номер задания (1-4). 0 - чтобы завершить: ', (x) => {
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
            default:
                console.log("Принимаются только цифры от 1 до 4 включительно. Попробуйте ещё раз.");
                askTaskNumber();
        }
    });
}

askTaskNumber();