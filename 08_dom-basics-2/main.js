"use strict";

function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}
function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.setAttribute('disabled', 'true');

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
        form,
        input,
        button
    }
}

function createTodoItem(name, done, id, key) {
    let item = document.createElement('li');
    let containerItem = document.createElement('div');
    let buttonDone = document.createElement('button');
    let buttonDelete = document.createElement('button'); 


    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;
    item.setAttribute('done', String(done));
    item.setAttribute('id', String(id));
    containerItem.classList.add('btn-group', 'btn-group-sm');
    buttonDone.classList.add('btn', 'btn-success');
    buttonDone.textContent = 'Готово';
    buttonDelete.classList.add('btn', 'btn-danger');
    buttonDelete.textContent = 'Удалить';
    let data = getMemory(key);
    
    
    buttonDone.addEventListener('click', function() {
       item.classList.toggle('list-group-item-success');
       //let currentItem = JSON.parse(localStorage.getItem(key));
     
        if (item.getAttribute('done') === 'false') {
            item.setAttribute('done', 'true');
            for (let i of data) {
           if(i.id === item.id) {
               i.done = 'true';
            }
        }
} 
        
        else if (item.getAttribute('done') === 'true') {
            item.setAttribute('done', 'false');
            for (let i of data) {
                if(i.id === item.id) {
                    i.done = 'false';
                }
            }   
        }
        localStorage.setItem(key, JSON.stringify(data));
})

    buttonDelete.addEventListener('click', function() {

        let currentItemId = item.getAttribute('id');
        //let storageList = JSON.parse(localStorage.getItem(key));
        if (!confirm('Вы уверены?')) {
            return;
        }
      if (data && data.length) { 
        let newStorageList = []; 
  
        for (let i=0; i < data.length; i++) { 
           if (data[i].id !== currentItemId) { 
              newStorageList.push(data[i]); 
           }
        }
        localStorage.setItem(key, JSON.stringify(newStorageList));
     }   
     item.remove();
   });
    

    containerItem.append(buttonDone);
    containerItem.append(buttonDelete);
    item.append(containerItem);

    return {
        item,
        buttonDone,
        buttonDelete,
    }
}

function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add = 'list-group';
    return list;
}

 let startList1 = [{name: 'построить дом', done: true}, 
 {name: 'вырастить сына', done: true}, 
 {name: 'посадить дерево', done: false}]; 

 let startList2 = [{name: 'построить', done: true}, 
                   {name: 'вырастить', done: true}, 
                   {name: 'посадить', done: false}, 
                   {name: 'построить', done: true}, 
                   {name: 'вырастить', done: true}, 
                   {name: 'посадить', done: false}];

function getMemory(key) {
const data = JSON.parse(localStorage.getItem(key));
console.log(data);
return data;
}

function createTodoApp(container, title, key, startList = false) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let todoStartList = createTodoStartList(startList);
    let itemsArray = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];

    localStorage.setItem(key, JSON.stringify(itemsArray));
    //const data = JSON.parse(localStorage.getItem(key));
    let data = getMemory(key);

    function createTodoStartList(startList)  {                

        for (let i = 0; i < startList.length; i++) {
    
            let todoStartItem = createTodoItem(Object.values(startList[i])[0], Object.values(startList[i])[1], todoList.children.length);
                if (todoStartItem.item.getAttribute('done') === 'true') {
                    todoStartItem.item.classList.add('list-group-item-success');
                }
          todoList.append(todoStartItem.item);
           }
           return todoList;
        }

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    container.append(todoStartList);

    todoItemForm.input.addEventListener('input', function() {
        
        if (todoItemForm.input.value) {
            todoItemForm.button.disabled = false;
        }
        else {
            todoItemForm.button.disabled = true;
        }
    
    })

    todoItemForm.form.addEventListener('submit', function(e) {

        e.preventDefault();
    
        if (!todoItemForm.input.value) {
            return;
        }
    
        let todoItem = createTodoItem(todoItemForm.input.value, false, todoList.children.length, key);
       
        let object = {};
        object.name = todoItemForm.input.value;
        object.done = todoItem.item.getAttribute('done'); 
        object.id = todoItem.item.getAttribute('id');
        console.log(object);

        itemsArray.push(object);
       
        console.log(itemsArray);
        localStorage.setItem(key, JSON.stringify(itemsArray));

        todoList.append(todoItem.item);
    
        todoItemForm.input.value = ''; 

        todoItemForm.button.disabled = true;

    });
        data.forEach(item => {
         let todoNewItem = createTodoItem(item.name, item.done, todoList.children.length, key);
         if (todoNewItem.item.getAttribute('done') === 'true') {
            todoNewItem.item.classList.add('list-group-item-success');
        }
         item.id = String(todoList.children.length);
         localStorage.setItem(key, JSON.stringify(data));

         todoList.append(todoNewItem.item);
        })
        window.createTodoApp = createTodoApp;
    }
