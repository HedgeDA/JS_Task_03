"use strict";

const view = document.getElementById('view');
const nav = document.getElementById('nav');

function setView(event) {
    event.preventDefault();

    view.src = this.href;

    let elements = nav.getElementsByClassName('gallery-current');
    if (elements.length > 0) {
        elements[0].classList.remove('gallery-current');
    }

    this.classList.add('gallery-current');
}

for (let element of nav.getElementsByTagName('a')) {
    element.addEventListener('click', setView);
}
