let promise = new Promise(function(resolve, reject) {
resolve(1);
setTimeout(() => resolve(2), 1000);
});
promise.then(console.log);

// выводится 1, т.к 
// промис нельзя изменить 
// после того, как он уже выполнен.