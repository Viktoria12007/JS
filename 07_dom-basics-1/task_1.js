"use strict";

document.addEventListener('DOMContentLoaded', function() {

let enterNumber = document.querySelector('.enter_number');
let buttonTimer = document.querySelector('.start_timer');
let timer = document.querySelector('.timer');
let counter;

function getStartPoint() {
    timer.textContent = enterNumber.value;
}

enterNumber.addEventListener('input', getStartPoint);

function createTimer() {
    if (parseInt(timer.textContent) > 0) {
    let numberTimer = parseInt(timer.textContent);
    timer.textContent = numberTimer - 1;
    }
}

buttonTimer.addEventListener('click', function() {
  
  clearInterval(counter);
  counter = setInterval(createTimer, 1000);

   })

})