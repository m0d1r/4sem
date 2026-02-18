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
    arr = [1, 2, 3];
    console.log(arr[2]);
    console.log(arr.length)
    arr.splice(2,1);
    arr.forEach(element => {
       console.log(element);
    });
}

const task2 = () => {
    console.log("task 2\n1:");
    countries = ["Russia", "Germany", "China"];
    population = [1500000, 100000, 12345678908765432]
    for (i = 0; i < countries.length; i++){
        console.log("Country: " + countries[i] + " | population: " + population[i])
    }
    console.log("\n2:")
    for (i in countries) {
        console.log("Country: " + countries[i] + " | population: " + population[i])
    }
}

const task3 = () => {
    console.log("task 3");
    let arr = ["January", "February", "March", "April", "May", "June"];
    let len = arr.pop();
    console.log(arr.join(" "));
    console.log(len);
}

const task4 = () => {
    console.log("task 4");
    let a = [1, 2, 3, 4, 5, 6, 7];
    let t = a.slice(0, 3);
    console.log(t);
}

const task5 = () => {
    console.log("task 5");
    let a = [1, 2, 3, 4, 5, 6, 7];
    let d = a.splice(1, 3)
    console.log(a);

}

const task6 = () => {
    console.log("task 6");
    array = [1, 2, 3, 4, 5];
    console.log(array.reverse())
}

const task7 = () => {
    console.log("task 7");
    array = ["c", 5, 2, "b", 3, 1, 4, "a"]
    console.log(array.sort((a, b) => String(a).localeCompare(String(b))))
}

const task8 = () => {
    console.log("task 8");
    array = [1, 2, 3, 4, 5];
    console.log(array.join("+"));
}

const task9 = () => {
    console.log("task 9");
    array = [1, 2, 3, 4, 6];
    array2 = [8, 2, 5, 9, 5];
    merge = array.concat(array2).sort((a, b) => a - b);
    console.log(merge);
    console.log(((merge[merge.length/2 - 1]) + merge[merge.length/2])/2);
}

const task10 = () => {
    console.log("task 10");
    array = [6, 2, 5, 7, 1, 6, 3, 7, 2, 9];
    console.log("Исходный массив:", array);
    //деструктуризация массива
    [array[array.indexOf(Math.max(...array))], 
    array[array.indexOf(Math.min(...array))]]
    =
    [array[array.indexOf(Math.min(...array))], 
    array[array.indexOf(Math.max(...array))]]
    console.log("После изменений:", array);
}

const task11 = () => {
    console.log("task 11");
    let array = [9, 8, 3, 3, 7, 1];
    console.log("Исходный массив:", array);

    let badIndex = array.findIndex((item, i) => i > 0 && array[i-1] < item);

    if (badIndex == -1) {
        console.log("В обратном порядке:", array.reverse());
    } else {
        console.log("Первый нарушающий элемент на индексе:", badIndex);
    }
}

const task12 = () => {
    console.log("task 12");
    array = [10, 12, 20, 22, 11, 13, -21, -23];
    console.log("Исходный: ", array)
    array.forEach(element => {
        if (array.indexOf(element) % 2 == 0 && element < 0) {
            array[array.indexOf(element)] = element/5;
        }
        else if (array.indexOf(element) % 2 == 1 && element > 0) {
            array[array.indexOf(element)] = element*3;
        }
        }
    );
    console.log("После махинаций: ", array)
}

const task13 = () => {
    console.log("task 13");
    matrix = [[1, 2, 3, 4 ,5],
              [-1, -7, -3, 10, 7],
              [-10, -5, -2, 100, 5],
              [8, -4, 9, -10, 10],
              [6, 11, 12, 13, 14]]
    for (i = 0; i < matrix.length; i++) {
        for (j = 0; j < matrix[i].length; j++) {
            element = matrix[i][j];
            if (-5 <= element && element <= 7) {
                console.log(`matrix[${i}][${j}] = ${element}`);
            }
        }
    }
}

const task14 = () => {
    console.log("task 14");
    matrix = [[1, 2, 3, 4 ,5],
              [-1, -7, -3, 10, 7],
              [6, 11, 12, 13, 14]];
    console.log("Матрица:", matrix);

    sum = 0;
    for (i = 0; i < matrix.length; i++) {
        maxInRow = matrix[i][0];
        for (j = 1; j < matrix[i].length; j++) {
            if (matrix[i][j] > maxInRow) {
                maxInRow = matrix[i][j];
            }
        }
        sum += maxInRow;
    }

    prod = 1;
    for (j = 0; j < matrix[0].length; j++) {
        minInCol = matrix[0][j];
        for (i = 1; i < matrix.length; i++) {
            if (matrix[i][j] < minInCol) {
                minInCol = matrix[i][j];
            }
        }
        prod *= minInCol;
    }
    console.log("Сумма максимальных:", sum);
    console.log("Произведение минимальных:", prod);
}

const task15 = () => {
    console.log("task 15");
    booksByAuthor = {
    "Пушкин": ["Евгений Онегин", "Капитанская дочка"],
    "Есенин": ["Пугачёв"],
    "Донцова": ["Крутые наследнички", "Уха из золотой рыбки", "Букет прекрасных дам (нет не дам >:[))"],
    "Толстой": ["Война и мир"]
    };

    for (author in booksByAuthor) {
        console.log(author + ":");
        for (i = 0; i < booksByAuthor[author].length; i++) {
            console.log((i + 1) + ". " + booksByAuthor[author][i]);
        }
    }
}

const askTaskNumber = () => {
    rl.question('Введите номер задания (1-15). 0 - чтобы завершить: ', (x) => {
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
            default:
                console.log("Принимаются только цифры от 1 до 15 включительно. Попробуйте ещё раз.");
                askTaskNumber();
        }
    });
}

askTaskNumber();