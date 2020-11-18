let n = -3;
let m = -10;

let range = Math.abs(n-m); 
let in_range = Math.round(Math.random() * range);
let min = Math.min(n, m); 
let random_number = in_range + min; 

if (random_number % 2 === 0) {
    random_number++;
}

console.log('Случайное число: ', random_number);