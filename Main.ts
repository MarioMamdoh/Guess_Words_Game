const gameRow = document.querySelector(".row-1");
const gameInput = document.querySelector(".inputs");
const gameName = "Guess The Word";
const checkWord = document.querySelector(".buttons .check");
const hintBtn = document.querySelector(".hint");
const hintValue = document.querySelector(".hint span");
document.title = gameName;
document.querySelector("header h1")!.innerHTML = gameName;
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
  hintBtn?.addEventListener("click", handleHint);
  restartGame();
}

function restartGame() {
  restartBtn?.addEventListener("click", () => {
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
        (inputs[index] as HTMLInputElement).value = word;
      }
    });
  }
}
function handleSameWords() {
  checkWord?.addEventListener("click", () => {
    let successGuess = true;
    let currentInputs = document.querySelectorAll("input:not([disabled])");
    currentInputs.forEach((input: HTMLInputElement, index) => {
      if (input.value.toLowerCase() === arrayWord[index]) {
        input.classList.add("in-place");
      } else if (arrayWord.includes(input.value)) {
        successGuess = false;
        input.classList.add("not-in-place");
      } else {
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
function resultOfGame(successGuess: boolean) {
  if (successGuess) {
    let span = document.createElement("span");
    span.textContent = `Congrtiz You Win`;
    msgArea?.classList.add("show");
    msgArea?.append(span);
    if (hint === 2) {
      let p = document.createElement("p");
      p.textContent = `Wow You Don't Use Any Hints`;
      msgArea?.append(p);
    }
    let inputs = document.querySelectorAll(".inputs input");
    inputs.forEach((input: HTMLInputElement) => (input.disabled = true));
    let trys = document.querySelectorAll(".try");
    trys.forEach((everyTry) => everyTry.classList.add("disabled"));
    checkWord?.classList.add("disabled");
    hintBtn?.classList.add("disabled");
    restartBtn?.classList.add("show");
  } else {
    if (currentTry === tryNumbers + 1) {
      let span = document.createElement("span");
      span.textContent = `You Lose The Word Is : ${randomWord}`;
      msgArea?.classList.add("lose");
      msgArea?.append(span);
      checkWord?.classList.add("disabled");
      hintBtn?.classList.add("disabled");
      restartBtn?.classList.add("show");
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
    gameInput?.append(colDiv);
  }
}

function handleTrys() {
  for (let i = 1; i <= tryNumbers; i++) {
    const tryNumber = document.querySelector(`.try-${i} .try-${i}`);
    tryNumber?.classList.add("disabled");
    if (i === currentTry) {
      tryNumber?.classList.remove("disabled");
      const currentInputs = document.querySelectorAll(
        `.try-${currentTry} input`
      );
      currentInputs.forEach((input: HTMLInputElement) => {
        (currentInputs[0] as HTMLInputElement).focus();
        input.disabled = false;
      });
    } else {
      const allInputs = document.querySelectorAll(`.try-${i} input`);
      allInputs.forEach((input: HTMLInputElement) => {
        input.disabled = true;
      });
    }
  }
}
function handleInputs() {
  let inputs = document.querySelectorAll(".inputs input");
  inputs.forEach((input: HTMLInputElement, index) => {
    const nextInput = inputs[index + 1] as HTMLInputElement;
    const prevInput = inputs[index - 1] as HTMLInputElement;
    input.addEventListener("keyup", (key) => {
      if (input.value && index != inputs.length - 1) {
        nextInput.focus();
      }
      if (key.code === "ArrowRight") {
        if (nextInput) nextInput.focus();
      }
      if (key.code === "ArrowLeft") {
        if (prevInput) prevInput.focus();
      }
    });
  });
}
window.onload = () => {
  generateGameSystem();
};
