"use strict";

let row ="Привет, мир!";
let rowReverse = '';
let i;

for (i = row.length - 1; i >= 0; --i) {
rowReverse += row[i];
}

console.log(rowReverse);