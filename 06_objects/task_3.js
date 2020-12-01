"use strict";

export let simpleArray = [1, 2, 3, 'четыре', 'пять', 'шесть'];

export let listObjectsBySimpleArray = [];

export function createListObjectsBySimpleArray(simpleArray) {

    for (let value of simpleArray) {
         let object = {};
         object.value = value;
         object.label = value;
         listObjectsBySimpleArray.push(object);
    }
     return listObjectsBySimpleArray;
}

console.log(createListObjectsBySimpleArray(simpleArray));