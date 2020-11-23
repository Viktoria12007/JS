"use strict";

let number_of_month = [];
let day_of_week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let first_day = 'Суббота';
let i;
let first_day_i;
let day_of_week_reverse;

for (i = 1; i <= 31; ++i) {
    number_of_month.push(i);
}
 
first_day_i = day_of_week.indexOf(first_day);
day_of_week_reverse = day_of_week.slice(first_day_i).concat(day_of_week.slice(0, first_day_i));

for (i=0; i < 31; ++i) {
    console.log(`${number_of_month[i]} января, ${day_of_week_reverse[i % 7]}`); 
}
