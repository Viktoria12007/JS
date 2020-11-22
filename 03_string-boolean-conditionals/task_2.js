let name = 'Виктория';
let surname = 'Голубова';

let right_name = name[0].toUpperCase() + name.substr(1).toLowerCase();
let right_surname = surname[0].toUpperCase() + surname.substr(1).toLowerCase();

console.log(right_name);
console.log(right_surname);

right_name !== name ? console.log('Имя было преобразовано') : console.log('Имя осталось без изменений');
right_surname !== surname ? console.log('Фамилия была преобразована') : console.log('Фамилия осталась без изменений');