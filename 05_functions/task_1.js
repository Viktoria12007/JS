"use strict";

let allListEmail = ['kipres@ssau.ru', 'arkhipov@ssau.ru', 'aslanov vs@mail.ru', 'byui@ssau.ru', 'balykin@ssau.ru', 'okm@ssau.ru', 'aibelousov@mail.ru', 'aduknanko@mail.ru', 'dolgich@inbox.ru', 'zav@smr.ru'];
let blackListEmail = ['arkhipov@ssau.ru', 'byui@ssau.ru','okm@ssau.ru'];
let whiteListEmail = [];

function createWhiteListEmail(allListEmail, blackListEmail) {
   for (let i of allListEmail) {
     if (blackListEmail.includes(i) !== true) {
        whiteListEmail.push(i);
     }
   }
   return whiteListEmail;
}

console.log(createWhiteListEmail(allListEmail, blackListEmail));

export default function createWhiteListEmail() {
   
}
