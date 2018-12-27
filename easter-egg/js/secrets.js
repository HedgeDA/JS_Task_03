"use strict";

const nav = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];
const secretCode = 'YTNJKJUBZ';
let inputedCode = '';

function keyPress(event) {
    if (!(event instanceof KeyboardEvent)) {
        return;
    }

    if (event.ctrlKey) {
        if (event.code === 'KeyT' && event.altKey) {
            event.preventDefault();

            nav.classList.toggle('visible');
        }
    }
}

function keyPressSecretCode(event) {
    if (!(event instanceof KeyboardEvent)) {
        return;
    }

    if (event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt') {
        return;
    }

    if (event.code.indexOf('Key') < 0) {
        inputedCode = '';

        return;
    }

    inputedCode += event.code.replace('Key', '');

    console.log(inputedCode);

    if (secretCode.indexOf(inputedCode) < 0) {
        inputedCode = '';

        return;
    }

    if (inputedCode === secretCode) {
        secret.classList.add('visible');
    }
}

document.addEventListener('keydown', keyPress);
document.addEventListener('keydown', keyPressSecretCode);
