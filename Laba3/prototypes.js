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
    let animal = {
    jumps: null
    };
    let rabbit = {
    __proto__: animal,
    jumps: true
    };
    console.log(rabbit.jumps); // true, потму что в кролике так написано
    delete rabbit.jumps;
    console.log(rabbit.jumps); // null, потому что кролику вырезали прыжки, а в родителе кролика null
    delete animal.jumps;
    console.log(rabbit.jumps); // undefined, потому что всех вырезали, некого знать
}

const task2 = () => {
    console.log("task 2");
    let animal = {
    eat() {
    this.full = true;
    }
    };
    let rabbit = {
    __proto__: animal
    };
    rabbit.eat();

    console.log("animal:", animal); //тут не фулл
    console.log("rabbit:", rabbit); //тут фудд
}

const task3 = () => {
    console.log("task 3");
    let hamster = {
    eat(food) {
    this.stomach.push(food);
    }
    };
    let speedy = {
    __proto__: hamster,
    stomach: []
    };
    let lazy = {
    __proto__: hamster,
    stomach: []
    };
    // Этот хомяк нашёл еду
    speedy.eat("apple");
    console.log(speedy.stomach); // apple
    // У этого хомяка тоже есть еда. Почему? 
    // Потому что у них был один желудок на двоих
    console.log(lazy.stomach); // apple (Уже нет)

}

const task4 = () => {
    console.log("task 4");
    // Добавление свойства по умолчанию к встроенному объекту
    String.prototype.color = "black";
    String.prototype.size = "14";
    // Добавление (изменение) метода к встроенному объекту
    String.prototype.write = stringWrite;
    function stringWrite(){
    console.log("Цвет текста: " + this.color + "\nРазмер шрифта: " + this.size);
    console.log("Текст: " + this.toString())
    }
    // используем измененный класс
    let s = new String("Это строка");
    s.color = "red";
    s.size = "16";
    s.write();
    let s2 = new String("Вторая строка");
    s2.write();
}

const task5 = () => {
    console.log("task 5");
    function Rabbit() {}
    Rabbit.prototype = {
    eats: true
    };
    let rabbit = new Rabbit();
    console.log(rabbit.eats); // true
    //Что будет выведено в консоль, если перед console.log добавить строчку:
    // Rabbit.prototype = {}; true - объект принял значения объекта до того, как тот был изменён
    // Rabbit.prototype.eats = false; false - здесь мы не меняем прототип, а меняем его свойство, поэтому изменения применяются
    // delete rabbit.eats; true - delete удаляет только собственные свойтва объекта
    // delete Rabbit.prototype.eats; undifined - опять же изменяем свойство (удаляем, в данном случае)
}

const askTaskNumber = () => {
    rl.question('Введите номер задания (1-5). 0 - чтобы завершить: ', (x) => {
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
            default:
                console.log("Принимаются только цифры от 1 до 5 включительно. Попробуйте ещё раз.");
                askTaskNumber();
        }
    });
}

askTaskNumber();