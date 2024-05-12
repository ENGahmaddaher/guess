let gamename = "Guess The Word";
document.querySelector("h1").innerHTML = gamename;
document.querySelector(
  "footer"
).innerHTML = `${gamename} Game Created By Ahmad Daher`;
document.title = gamename;
let numbersOfTry = 8;
let numbersOfLetters = 6;
let currentTry = 1;
let hints = 2;
//manage words
let wordGuess = "";
const word = [
  "create",
  "update",
  "delete",
  "Master",
  "branch",
  "mainly",
  "Elzero",
  "school",
];
wordGuess = word[Math.floor(Math.random() * word.length)].toLowerCase();
let messageArea = document.querySelector(".message");
//manage hints
document.querySelector(".hint span ").innerHTML = hints;
const gethintb = document.querySelector(".hint");
gethintb.addEventListener("click", gethint);

function generate() {
  const inputContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numbersOfTry; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>try ${i}</span>`;
    inputContainer.appendChild(tryDiv);
    if (!(i === 1)) tryDiv.classList.add("disable-input");
    for (let j = 1; j <= numbersOfLetters; j++) {
      const inp = document.createElement("input");
      inp.type = "text";
      inp.id = `guess-${i}-letter${j}`;
      inp.setAttribute("maxlength", "1");
      tryDiv.appendChild(inp);
    }
  }
  inputContainer.children[0].children[1].focus();
  //disable input axcept first one
  const inputDisabled = document.querySelectorAll(".disable-input input");
  inputDisabled.forEach((input) => (input.disabled = true));
  const input_all = document.querySelectorAll("input");
  input_all.forEach((e, index) => {
    e.addEventListener("input", function () {
      this.value = this.value.toLowerCase();
      const nextInput = input_all[index + 1];
      if (nextInput) nextInput.focus();
    });
    e.addEventListener("keydown", function (event) {
      const current = Array.from(input_all).indexOf(this); //or event.target
      if (event.key === "ArrowRight") {
        const nextInput = current + 1;
        if (nextInput < input_all.length) input_all[nextInput].focus();
      }

      if (event.key === "ArrowLeft") {
        const prevInput = current - 1;
        if (prevInput >= 0) input_all[prevInput].focus();
      }
    });
  });
}
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuess);
console.log(wordGuess);

function handleGuess() {
  let successGuess = true;
  for (let i = 1; i <= numbersOfLetters; i++) {
    let inputField = document.querySelector(`#guess-${currentTry}-letter${i}`);
    let currLetter = inputField.value.toLowerCase();
    let indexWord = wordGuess[i - 1];
    if (currLetter === indexWord) {
      inputField.classList.add("yes-in-place");
    } else if (wordGuess.includes(currLetter) && currLetter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }
  if (successGuess) {
    messageArea.innerHTML = `you win the word is <span>${wordGuess}</span>`;
    gethintb.disabled = true;

    if (hints === 2) {
      messageArea.innerHTML = `<p>congrats you did not use the hints </p>`;
    }
    let divTries = document.querySelectorAll(".inputs > div");
    divTries.forEach((E) => E.classList.add("disable-input"));
    guessButton.disabled = true;
  } else {
    document.querySelector(`.try-${currentTry}`).classList.add("disable-input");
    const disableInp = document.querySelectorAll(`.try-${currentTry} input`);
    disableInp.forEach((e) => (e.disabled = true));
    currentTry++;

    const nextTryinp = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryinp.forEach((e) => (e.disabled = false));
    let el = document.querySelector(`.try-${currentTry}`);

    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disable-input");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      gethintb.disabled = true;
      messageArea.innerHTML = `you lose the word is <span>${wordGuess}</span>`;
    }
  }
}
function gethint() {
  if (hints > 0) {
    hints--;
    document.querySelector(".hint span ").innerHTML = hints;
  }
  if (hints === 0) {
    gethintb.disabled = true;
  }
  const notdis = document.querySelectorAll("input:not([disabled])");
  const empty = Array.from(notdis).filter((e) => e.value === "");
  if (empty.length > 0) {
    const randomind = Math.floor(Math.random() * empty.length);
    const rand = empty[randomind];
    const indextofill = Array.from(notdis).indexOf(rand);
    if (indextofill !== -1) {
      rand.value = wordGuess[indextofill].toLowerCase();
    }
  }
}
function backspa(e) {
  if (e.key === "Backspace") {
    const inp = document.querySelectorAll("input:not([disabled])");
    const cureind = Array.from(inp).indexOf(document.activeElement); //active input ---focus
    if (cureind) {
      const cureinp = inp[cureind];
      const previnp = inp[cureind - 1];
      cureinp.value = "";
      previnp.value = "";
      previnp.focus();
    }
  }
}
document.addEventListener("keydown", backspa);
window.onload = function () {
  generate();
};
