"use strict";

    let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
    ];

    let value = Object.values(objects); 

    let newObjects = [];

   export default function filterObject(objects, name) {
    for (let i of value) {
           if (i.name === name) {
              newObjects.push(i);
           }
       }
        return newObjects;
   }
   console.log(filterObject(objects, 'Иван'));