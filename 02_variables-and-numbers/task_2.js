let a = 13.890123;
let b = 2.891564;
let n = 3;

let whole_a = a % 1;
let whole_b = b % 1;

let norma_a = Math.floor(whole_a * Math.pow(10, n));
let norma_b = Math.floor(whole_b * Math.pow(10, n));

console.log('Округлённая дробная часть а: ', norma_a);
console.log('Округлённая дробная часть b: ', norma_b);

console.log('Округлённые дробные части равны: ', norma_a === norma_b);
console.log('Округлённые дробные части не равны: ', norma_a !== norma_b);
console.log('Округлённая дробная часть а больше b: ', norma_a > norma_b);
console.log('Округлённая дробная часть а меньше b: ', norma_a < norma_b);
console.log('Округлённая дробная часть а больше либо равна b: ', norma_a >= norma_b);
console.log('Округлённая дробная часть а меньше либо равна b: ', norma_a <= norma_b);