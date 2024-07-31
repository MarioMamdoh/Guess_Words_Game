"use strict";
const gameRow = document.querySelector(".row-1");
const gameInput = document.querySelector(".inputs");
const gameName = "Guess The Word";
const checkWord = document.querySelector(".buttons .check");
const hintBtn = document.querySelector(".hint");
const hintValue = document.querySelector(".hint span");
document.title = gameName;
document.querySelector("header h1").innerHTML = gameName;
const msgArea = document.querySelector(".msg");
const restartBtn = document.querySelector(".restart");
const guessWords = [
    "Cloud",
    "Pocket",
    "Rested",
    "Shower",
    "Vacation",
    "Restaurant",
    "Dictionary",
    "Football",
    "Piano",
    "Sunset",
    "Computer",
    "Printer",
    "Folder",
    "Paperclip",
    "Scissors",
    "Telephone",
    "Television",
    "Camera",
    "Stapler",
];
const randomWords = Math.floor(Math.random() * guessWords.length);
const randomWord = guessWords[randomWords];
const arrayWord = Array.from(randomWord.toLowerCase());
const tryNumbers = Math.floor(arrayWord.length / 1.2);
let hint = Math.floor(arrayWord.length / 2.2);
if (hintValue) {
    hintValue.innerHTML = `${hint}`;
}
let currentTry = 1;
function generateGameSystem() {
    createInputs();
    handleInputs();
    handleTrys();
    handleSameWords();
    hintBtn === null || hintBtn === void 0 ? void 0 : hintBtn.addEventListener("click", handleHint);
    restartGame();
}
function restartGame() {
    restartBtn === null || restartBtn === void 0 ? void 0 : restartBtn.addEventListener("click", () => {
        location.reload();
    });
}
function handleHint() {
    const RandomIndexOfWord = Math.floor(Math.random() * arrayWord.length);
    const RandomLetter = arrayWord[RandomIndexOfWord];
    let inputs = document.querySelectorAll("input:not([disabled])");
    if (hint > 0) {
        hint--;
        if (hintValue) {
            hintValue.innerHTML = `${hint}`;
        }
        arrayWord.forEach((word, index) => {
            if (word === RandomLetter) {
                inputs[index].value = word;
            }
        });
    }
}
function handleSameWords() {
    checkWord === null || checkWord === void 0 ? void 0 : checkWord.addEventListener("click", () => {
        let successGuess = true;
        let currentInputs = document.querySelectorAll("input:not([disabled])");
        currentInputs.forEach((input, index) => {
            if (input.value.toLowerCase() === arrayWord[index]) {
                input.classList.add("in-place");
            }
            else if (arrayWord.includes(input.value)) {
                successGuess = false;
                input.classList.add("not-in-place");
            }
            else {
                input.classList.add("no-exists");
                successGuess = false;
            }
        });
        if (currentTry <= tryNumbers) {
            currentTry++;
        }
        handleInputs();
        handleTrys();
        resultOfGame(successGuess);
    });
}
function resultOfGame(successGuess) {
    if (successGuess) {
        let span = document.createElement("span");
        span.textContent = `Congrtiz You Win`;
        msgArea === null || msgArea === void 0 ? void 0 : msgArea.classList.add("show");
        msgArea === null || msgArea === void 0 ? void 0 : msgArea.append(span);
        if (hint === 2) {
            let p = document.createElement("p");
            p.textContent = `Wow You Don't Use Any Hints`;
            msgArea === null || msgArea === void 0 ? void 0 : msgArea.append(p);
        }
        let inputs = document.querySelectorAll(".inputs input");
        inputs.forEach((input) => (input.disabled = true));
        let trys = document.querySelectorAll(".try");
        trys.forEach((everyTry) => everyTry.classList.add("disabled"));
        checkWord === null || checkWord === void 0 ? void 0 : checkWord.classList.add("disabled");
        hintBtn === null || hintBtn === void 0 ? void 0 : hintBtn.classList.add("disabled");
        restartBtn === null || restartBtn === void 0 ? void 0 : restartBtn.classList.add("show");
    }
    else {
        if (currentTry === tryNumbers + 1) {
            let span = document.createElement("span");
            span.textContent = `You Lose The Word Is : ${randomWord}`;
            msgArea === null || msgArea === void 0 ? void 0 : msgArea.classList.add("lose");
            msgArea === null || msgArea === void 0 ? void 0 : msgArea.append(span);
            checkWord === null || checkWord === void 0 ? void 0 : checkWord.classList.add("disabled");
            hintBtn === null || hintBtn === void 0 ? void 0 : hintBtn.classList.add("disabled");
            restartBtn === null || restartBtn === void 0 ? void 0 : restartBtn.classList.add("show");
        }
    }
}
function createInputs() {
    for (let i = 1; i <= tryNumbers; i++) {
        let colDiv = document.createElement("div");
        colDiv.className = "col";
        colDiv.classList.add(`try-${i}`);
        let tryNumber = document.createElement("p");
        tryNumber.className = `try`;
        tryNumber.classList.add(`try-${i}`);
        tryNumber.textContent = `Try ${i}`;
        colDiv.appendChild(tryNumber);
        for (let j = 1; j <= randomWord.length; j++) {
            let input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            colDiv.append(input);
        }
        gameInput === null || gameInput === void 0 ? void 0 : gameInput.append(colDiv);
    }
}
function handleTrys() {
    for (let i = 1; i <= tryNumbers; i++) {
        const tryNumber = document.querySelector(`.try-${i} .try-${i}`);
        tryNumber === null || tryNumber === void 0 ? void 0 : tryNumber.classList.add("disabled");
        if (i === currentTry) {
            tryNumber === null || tryNumber === void 0 ? void 0 : tryNumber.classList.remove("disabled");
            const currentInputs = document.querySelectorAll(`.try-${currentTry} input`);
            currentInputs.forEach((input) => {
                currentInputs[0].focus();
                input.disabled = false;
            });
        }
        else {
            const allInputs = document.querySelectorAll(`.try-${i} input`);
            allInputs.forEach((input) => {
                input.disabled = true;
            });
        }
    }
}
function handleInputs() {
    let inputs = document.querySelectorAll(".inputs input");
    inputs.forEach((input, index) => {
        const nextInput = inputs[index + 1];
        const prevInput = inputs[index - 1];
        input.addEventListener("keyup", (key) => {
            if (input.value && index != inputs.length - 1) {
                nextInput.focus();
            }
            if (key.code === "ArrowRight") {
                if (nextInput)
                    nextInput.focus();
            }
            if (key.code === "ArrowLeft") {
                if (prevInput)
                    prevInput.focus();
            }
        });
    });
}
window.onload = () => {
    generateGameSystem();
};
//# sourceMappingURL=Main.js.map