"use strict";

export let objectWithDifferentKeys = {
    name: 'Виктория',
    surname: 'Голубова',
    age: 27,
    married: false,
    education: 'НИУ БелГу',
    occupation: 'Безработная'
};

export let listObjectsByObjectWithDifferentKeys = [];
export let values = Object.keys(objectWithDifferentKeys);
export let labels = Object.values(objectWithDifferentKeys);

export function createListObjectsByObjectWithDifferentKeys(objectWithDifferentKeys) {

    for (let i = 0; i < values.length; i++) {
        let object = {};
        object.value = values[i];
        object.label = labels[i];
        listObjectsByObjectWithDifferentKeys.push(object);
    }
    return listObjectsByObjectWithDifferentKeys;  
}

console.log(createListObjectsByObjectWithDifferentKeys(objectWithDifferentKeys));