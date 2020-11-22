let roadMines = [false, false, false, true, false, false, false, false, false, false];
let position = 0;
let mines = [];

for (let progress of roadMines) {
    position += 1;
    console.log(`Танк переместился на ${position}`);
    if (progress === false) continue;
    mines.push(progress);
    if (mines.length === 1) {
        console.log('Танк повреждён');
    }
    else if (mines.length === 2) {
        console.log('Танк уничтожен');
        break;
    }
}