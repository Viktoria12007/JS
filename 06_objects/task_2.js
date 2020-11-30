"use strict";

import {simpleArray, listObjectsBySimpleArray, createListObjectsBySimpleArray} from '/task_3.js';
import {objectWithDifferentKeys, listObjectsByObjectWithDifferentKeys, values, labels, createListObjectsByObjectWithDifferentKeys} from '/task_4.js';

let listObjects = [{ value: 'wood', label: 'Древесина' },
                   { value: 'plastic', label: 'Пластик' },
                   { value: 'stone', label: 'Камень' },
                   { value: 'metal', label: 'Металл' },
                   { value: 'composite', label: 'Композитный'},
                   { value: 'gypsum', label: 'Гипс' }];

let selectList = document.createElement("select");

function createSelectList(listObjects, selectedByDefaultObjects = 1) {                

for (let i = 0; i < listObjects.length; i++) {

    let option = document.createElement("option");
    option.value = Object.values(listObjects[i])[0];
    option.innerHTML = Object.values(listObjects[i])[1];
    selectList.append(option);

    if (option.index === selectedByDefaultObjects) {
        option.selected = true;
      }

   }
}

document.body.append(selectList);

createSelectList(listObjectsByObjectWithDifferentKeys);