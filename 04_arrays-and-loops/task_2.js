let row ="Привет, мир!";
let rowReverse = '';

for (i = row.length - 1; i >= 0; --i) {
rowReverse += row[i];
}

console.log(rowReverse);