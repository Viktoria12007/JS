"use strict";

let enterInfo = document.createElement('input');
enterInfo.type = 'text';

let showInfo = document.createElement('h2');
showInfo.textContent = '';

let timerId;


document.body.append(enterInfo);
document.body.append(showInfo);

function getStartPoint() {
  showInfo.textContent = enterInfo.value;
}
function createTimeOut() {
    clearTimeout(timerId);

    timerId = setTimeout(getStartPoint, 3000);
}

enterInfo.addEventListener('input', createTimeOut);