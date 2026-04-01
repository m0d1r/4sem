function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function interviewTask(candidate, taskNumber, prepTime, defenseTime) {
    console.log(candidate + " started the " + taskNumber + " task.");
    await delay(prepTime * 100);
    console.log(candidate + " moved on to the defense of the " + taskNumber + " task.");
    await delay(defenseTime * 100);
    console.log(candidate + " completed the " + taskNumber + " task.");
}

async function interviews(candidates) {
    const promises = candidates.map(async (candidate) => {
        const [name, prep1, defense1, prep2, defense2] = candidate;

        await interviewTask(name, 1, prep1, defense1);

        console.log(name + " is resting.");
        await delay(500);

        await interviewTask(name, 2, prep2, defense2);
    });

    await Promise.all(promises);
}

const candidates = [
    ["Ivan", 5, 2, 7, 2],
    ["John", 3, 4, 5, 1],
    ["Sophia", 4, 2, 5, 1]
];

interviews(candidates);