"use strict";

function createTitle() {
    const title = document.createElement('h1');
    title.textContent = 'Игра "Найди пару"';
    title.classList.add('mb-5', 'mt-5', 'text-center');
    return title;
}
function createForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');

    form.classList.add('input-group', 'mb-5');
    input.classList.add('form-control');
    input.placeholder = 'Введите количество карточек по вертикали/горизонтали';
    input.setAttribute('type', 'number');
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Начать игру';
    button.setAttribute('disabled', 'true');

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
        form,
        input,
        button
    }
}
function createCard(number) {
    const card = document.createElement('div');
    const frontFace = document.createElement('div');
    const numberTitle = document.createElement('h2');
    const backFace = document.createElement('div');

    card.classList.add('card');
    card.setAttribute('data-number', number);
    card.setAttribute('hasFlippedCard', 'false');
    frontFace.classList.add('front-face', 'd-flex', 'align-items-center', 'justify-content-center');
    numberTitle.classList.add('mb-0', 'mt-0', 'ml-0');
    numberTitle.textContent = number;
    backFace.classList.add('back-face');
    
    frontFace.append(numberTitle);
    card.append(frontFace);
    card.append(backFace);

    return {
        card,
        frontFace,
        numberTitle,
        backFace,
    }
}

function createCouplesSection() {
    const section = document.createElement('section');
    section.classList.add('box_for_cards', 'd-flex', 'flex-wrap', 'align-items-center');
    return section;
}

function createСouplesApp(container) {
     
    const couplesTitle = createTitle();
    const couplesForm = createForm();
    const couplesSection = createCouplesSection();
    let timerId;
    
    container.append(couplesTitle);
    container.append(couplesForm.form);
    container.append(couplesSection);

    couplesForm.input.addEventListener('input', () => {
        
        if (couplesForm.input.value) {
            couplesForm.button.disabled = false;
        }
        else {
            couplesForm.button.disabled = true;
        }
    
    });
    couplesForm.form.addEventListener('submit',  (e) => {

        e.preventDefault();
    
        if (!couplesForm.input.value && !localStorage.getItem('couplesKey')) {
            return;
        }
    
          function deleteAmountCards () {
        while (couplesSection.firstChild) {
             couplesSection.removeChild(couplesSection.firstChild);
        }
    }

    deleteAmountCards();
    
    function defaultGame() {

        couplesForm.input.value = localStorage.getItem('couplesKey');
        couplesForm.button.disabled = false;
        couplesForm.button.click();
        couplesForm.button.disabled = true;
    }
    
    clearTimeout(timerId);
    timerId = setTimeout(defaultGame, 60000);

    function createCouplesGame(amount) {
        for (let i = 1; i <= amount; i++) {
            createCard(i);
            createCard(i);
            couplesSection.append(createCard(i).card);  
            couplesSection.append(createCard(i).card);
        }
    };

    function chooseAmountCards(limit) { 
        if(limit >= 2 && limit <= 10) {
        localStorage.setItem('couplesKey', limit);
        createCouplesGame(parseInt(limit));
        }
        else { 
        localStorage.setItem('couplesKey', 4);
        createCouplesGame(4);
        }
    }
    if(couplesForm.input.value) {
        chooseAmountCards(couplesForm.input.value);
    }
    if(!couplesForm.input.value && localStorage.getItem('couplesKey')) {
        chooseAmountCards(JSON.parse(localStorage.getItem('couplesKey')));
    }

    const cards = document.querySelectorAll('.card');
    
    let stopFlip = false;
    let firstCard;
    let secondCard;
    let array = [];
    let firstObject = {};
    let secondObject = {};

    function flipCard() {

    if (stopFlip) {
      return;
    }

    this.classList.add('flip');
     
    if (this.getAttribute('hasFlippedCard') === 'false' && !array.length) {
        this.setAttribute('hasFlippedCard', 'true');
        firstObject.name = 'First card';
        firstObject.dataNumber = this.dataset.number;
        firstObject.hasFlippedCard = this.getAttribute('hasFlippedCard');
        array.push(firstObject);
        firstCard = this;
        return;
    }

    if (this.getAttribute('hasFlippedCard') === 'false' && array.length) {
        this.setAttribute('hasFlippedCard', 'true');
        secondObject.name = 'Second card';
        secondObject.dataNumber = this.dataset.number;
        secondObject.hasFlippedCard = this.getAttribute('hasFlippedCard');
        array.push(secondObject);
        secondCard = this;
        stopFlip = true;
        checkForMatch();
        setTimeout(() => {
            restartGame();
        }, 1500);
    
      }
      
    }
    
    function checkForMatch() {
       const isMatch = firstObject.dataNumber === secondObject.dataNumber;
       isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
       firstCard.removeEventListener('click', flipCard);
       secondCard.removeEventListener('click', flipCard);
       resetCards();
    }
    
    function unflipCards() {

       setTimeout(() => {
        firstCard.setAttribute('hasFlippedCard', 'false');
        secondCard.setAttribute('hasFlippedCard', 'false');
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCards();
       }, 1500);
    
    }

    function resetCards() {
       array.splice(0);
       stopFlip = false;
       [firstCard, secondCard] = [null, null];
    }

    function shuffle() {
       for (let i = cards.length - 1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i + 1)); 
         cards[i].style.order = String(j);
         cards[j].style.order = String(i);
       }
    }

    shuffle();
    
    function restartGame() {

       const flippedCards = document.querySelectorAll('.flip');
       console.log(flippedCards.length);

        if(flippedCards.length === cards.length) {
            if (!confirm('Вы выйграли! Сыграть ещё раз?')) {
                   deleteAmountCards();
                   return;
               }

            else {
                defaultGame();
                clearTimeout(timerId);
                timerId = setTimeout(defaultGame, 60000);

            }
        }    
        
    } 

    cards.forEach(card => card.addEventListener('click', flipCard));
    
        couplesForm.input.value = ''; 

        couplesForm.button.disabled = true;

    });

    window.createСouplesApp = createСouplesApp;

}