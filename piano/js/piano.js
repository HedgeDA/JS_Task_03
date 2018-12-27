"use strict";

const elements = [
    {
        sound: 'first.mp3',
        plays: false
    },
    {
        sound: 'second.mp3',
        plays: false
    },
    {
        sound: 'third.mp3',
        plays: false
    },
    {
        sound: 'fourth.mp3',
        plays: false
    },
    {
        sound: 'fifth.mp3',
        plays: false
    }]

const piano = document.getElementsByClassName('set middle')[0];

function setSounds() {
    let path = 'sounds/' + piano.className.replace('set ', '') + '/';

    for (let element of elements) {
        element.audio.src = path + element.sound;
    }
}

function SetMode(lower = false, higher = false) {
    let mode = 'set middle';

    if (lower) {
        mode = 'set lower';
    }

    if (higher) {
        mode = 'set higher';
    }

    if (piano.className != mode) {
        piano.className = mode;
    }

    setSounds();
}

function ketDown(event) {
    if (!(event instanceof KeyboardEvent)) {
        return;
    }

    if (event.key === 'Shift' || event.key === 'Alt') {
        event.preventDefault();

        console.log(event.code);

        if (event.key === 'Shift') {
            SetMode(true, false)
        } else {
            SetMode(false, true);
        }

        return;
    }

    if (!/^[1-5!@#$%]/.exec(event.key)) {
        return;
    }

    if (!elements[Number(event.code.replace('Digit', '')) - 1].audio.plays) {
        elements[Number(event.code.replace('Digit', '')) - 1].audio.plays = true;
        elements[Number(event.code.replace('Digit', '')) - 1].audio.src = elements[Number(event.code.replace('Digit', '')) - 1].audio.src;
        elements[Number(event.code.replace('Digit', '')) - 1].audio.play();
    }
}

function ketUp(event) {
    if (!(event instanceof KeyboardEvent)) {
        return;
    }

    if (event.key === 'Shift' || event.key === 'Alt') {
        event.preventDefault();

        SetMode(event.shiftKey, event.altKey);

        return
    }

    if (!/^[1-5!@#$%]/.exec(event.key)) {
        return;
    }

    if (elements[Number(event.code.replace('Digit', '')) - 1].audio.plays) {
        elements[Number(event.code.replace('Digit', '')) - 1].audio.plays = false;
    }
}

let index = 0;
for (let element of piano.getElementsByTagName('audio')) {
    elements[index].audio = element;

    index++;
}

setSounds();

document.addEventListener('keydown', ketDown);
document.addEventListener('keyup', ketUp);
