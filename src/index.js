import { fromEvent } from "rxjs";

const letterRows = document.getElementsByClassName('letter-row');

const onKeyDown$ = fromEvent(document, "keydown");
let letterIndex = 0;
let letterRowIndex = 0;
const letterGrid = Array.from(letterRows).map(row => Array.from(row.children).map(() => ''));

const insertLetter = {
    next: (event) => {
        const pressedKey = event.key.toUpperCase();
        if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i)) {
            if (letterRowIndex < letterRows.length && letterIndex < letterRows[letterRowIndex].children.length) {
                let letterBox = letterRows[letterRowIndex].children[letterIndex];
                letterBox.textContent = pressedKey;
                letterBox.classList.add('filled-letter');
                letterGrid[letterRowIndex][letterIndex] = pressedKey;
                letterIndex++;
            }
        }
    }
}

const deleteLetter = {
    next: (event) => {
        const deleteKey = event.key;
        if (deleteKey === 'Backspace') {
            if (letterIndex > 0) {
                letterIndex--;
                let letterBox = letterRows[letterRowIndex].children[letterIndex];
                letterBox.textContent = '';
                letterBox.classList.remove('filled-letter');
                letterGrid[letterRowIndex][letterIndex] = '';
            } else if (letterRowIndex > 0) {
                letterRowIndex--;
                letterIndex = letterRows[letterRowIndex].children.length - 1;
                let letterBox = letterRows[letterRowIndex].children[letterIndex];
                letterBox.textContent = '';
                letterBox.classList.remove('filled-letter');
                letterGrid[letterRowIndex][letterIndex] = '';
            }
        }
    }
}

onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(deleteLetter);
