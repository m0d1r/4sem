console.log("task 1");
const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
function ask_password(login, password, success, failure) {
    login = login.toLowerCase();
    password = password.toLowerCase();
    let vowelsCount = 0;
    for (let char of password) {
        if (vowels.includes(char)) {
            vowelsCount++;
        }
    }
    let loginConsonants = "";
    let passwordConsonants = "";
    
    for (let char of login) {
        if (!vowels.includes(char)) {
            loginConsonants += char;
        }
    }
    
    for (let char of password) {
        if (!vowels.includes(char)) {
            passwordConsonants += char;
        }
    }
    
    const vowelsCorrect = (vowelsCount === 3);
    const consonantsCorrect = (loginConsonants === passwordConsonants);
    
    if (vowelsCorrect && consonantsCorrect) {
        success(login);
    } else if (!vowelsCorrect && !consonantsCorrect) {
        failure(login, "Everything is wrong");
    } else if (!vowelsCorrect) {
        failure(login, "Wrong number of vowels");
    } else {
        failure(login, "Wrong consonants");
    }
}
function main(login, password) {
    ask_password(
        login, 
        password, 
        function(login) {
            console.log(`Привет, ${login}!`);
        },
        function(login, errorMessage) {
            console.log(`Кто-то пытался притвориться пользователем ${login}, но в пароле допустил ошибку: ${errorMessage.toUpperCase()}.`);
        }
    );
}
main("login", "abobon");
main("login", "luagon");