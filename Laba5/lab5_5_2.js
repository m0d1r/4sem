function readConfig(name, callback) {
    setTimeout(() => {
        console.log("1) config from " + name + " loaded");
        callback();
    }, Math.floor(Math.random() * 1000));
}

function doQuery(statement, callback) {
    setTimeout(() => {
        console.log("2) SQL query executed: " + statement);
        callback();
    }, Math.floor(Math.random() * 1000));
}

function httpGet(url, callback) {
    setTimeout(() => {
        console.log("3) Page retrieved: " + url);
        callback();
    }, Math.floor(Math.random() * 1000));
}

function readFile(path, callback) {
    setTimeout(() => {
        console.log("4) Readme file from " + path + " loaded");
        callback();
    }, Math.floor(Math.random() * 1000));
}

function callback() {
    console.log("It is done!");
}

function readConfigPromise(name) {
    return new Promise((resolve) => {
        readConfig(name, resolve);
    });
}

function doQueryPromise(statement) {
    return new Promise((resolve) => {
        doQuery(statement, resolve);
    });
}

function httpGetPromise(url) {
    return new Promise((resolve) => {
        httpGet(url, resolve);
    });
}

function readFilePromise(path) {
    return new Promise((resolve) => {
        readFile(path, resolve);
    });
}

async function runTasks() {
    console.log("start");
    await readConfigPromise("myConfig");
    await doQueryPromise("select * from cities");
    await httpGetPromise("http://google.com");
    await readFilePromise("README.md");
    callback();
    console.log("end");
}

runTasks();