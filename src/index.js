import { fromEvent, Subject } from "rxjs";
import WORDS_LIST from "./wordsList.json";

const letterRows = document.getElementsByClassName("letter-row");
const onKeyDown$ = fromEvent(document, "keydown");
let letterIndex = 0;
let letterRowIndex = 0;
let userAnswer = [];
const getRandomWord = () =>
    WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
let rightWord = getRandomWord();
console.log(`Right word: ${rightWord}`);

const userWinOrLoose$ = new Subject();

const insertLetter = {
    next: (event) => {
        const pressedKey = event.key.toUpperCase();
        if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i)) {
            let letterBox =
                Array.from(letterRows)[letterRowIndex].children[letterIndex];
            letterBox.textContent = pressedKey;
            letterBox.classList.add("filled-letter");
            letterIndex++;
            userAnswer.push(pressedKey);
        }
    },
};

const checkWord = {
    next: (event) => {
        if (event.key === "Enter") {
            if (userAnswer.join("") === rightWord) {
                userWinOrLoose$.next();
            }
        }
    },
};

onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(checkWord);

userWinOrLoose$.subscribe(() => {
    let letterRowsWinned = letterRows[letterRowIndex];  
    for (let i = 0; i < 5; i++) {
        letterRowsWinned.children[i].classList.add("letter-green");
    }
});