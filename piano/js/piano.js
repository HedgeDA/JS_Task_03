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
    if (lower) {
        piano.classList.add('lower')
    } else {
        piano.classList.remove('lower')
    }

    if (higher) {
        piano.classList.add('higher')
    } else {
        piano.classList.remove('higher')
    }

    if (!lower && !higher) {
        piano.classList.add('middle')
    } else {
        piano.classList.remove('middle')
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

function playSound(event) {
     this.getElementsByTagName('audio')[0].src = this.getElementsByTagName('audio')[0].src;
     this.getElementsByTagName('audio')[0].play();
}

let index = 0;
for (let element of piano.getElementsByTagName('audio')) {
    elements[index].audio = element;

    index++;
}

for (let element of piano.getElementsByTagName('li')) {
    element.addEventListener('click', playSound);
}

setSounds();

document.addEventListener('keydown', ketDown);
document.addEventListener('keyup', ketUp);
