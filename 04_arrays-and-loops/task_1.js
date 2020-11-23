"use strict";

let n = -3;
let m = -10;
let count = 42;
let range = Math.abs(m-n);
let min = Math.min(n, m);
let massif = [];
let i;

for (i = 0; i < count; i++) {
massif.push((Math.round(Math.random() * range)) + min);
}
console.log(massif);