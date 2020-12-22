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

function createTodoItem(name, done, key) {
    let item = document.createElement('li');
    let containerItem = document.createElement('div');
    let buttonDone = document.createElement('button');
    let buttonDelete = document.createElement('button'); 


    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;
    item.setAttribute('done', String(done));
    containerItem.classList.add('btn-group', 'btn-group-sm');
    buttonDone.classList.add('btn', 'btn-success');
    buttonDone.textContent = 'Готово';
    buttonDelete.classList.add('btn', 'btn-danger');
    buttonDelete.textContent = 'Удалить';
    
    
    buttonDone.addEventListener('click', function() {
       item.classList.toggle('list-group-item-success');
       let currentItem = JSON.parse(localStorage.getItem(key));
        if (item.getAttribute('done') === 'false') {
            item.setAttribute('done', 'true');
            for (let i of Object.values(currentItem)) {
           if(i.id === parseInt(item.id)) {
               i.done = 'true';
            }
        }
} 
        
        else if (item.getAttribute('done') === 'true') {
            item.setAttribute('done', 'false');
            for (let i of Object.values(currentItem)) {
                if(i.id === parseInt(item.id)) {
                    i.done = 'false';
                }
            }   
        }
        localStorage.setItem(key, JSON.stringify(currentItem));
})

    buttonDelete.addEventListener('click', function() {

        //let currentItem = JSON.parse(localStorage.getItem(key));
        if (confirm('Вы уверены?')) {
        item.remove();
        //for (let i of Object.values(currentItem)) {
          //  if (i.id === parseInt(item.id)) {
          //      currentItem.splice(i, 1);
        localStorage.removeItem(key);
        //console.log(currentItem);
       // }
    }

      // localStorage.setItem(key, JSON.stringify(currentItem));
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

function createTodoApp(container, title, key, startList = false) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let todoStartList = createTodoStartList(startList);
    let itemsArray = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];

    localStorage.setItem(key, JSON.stringify(itemsArray));
    const data = JSON.parse(localStorage.getItem(key));

    function createTodoStartList(startList)  {                

        for (let i = 0; i < startList.length; i++) {
    
            let todoStartItem = createTodoItem(Object.values(startList[i])[0], Object.values(startList[i])[1]);
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
    
        let todoItem = createTodoItem(todoItemForm.input.value, false, key);

        
        let object = {};
        object.name = todoItemForm.input.value;
        object.done = (todoItem.item.getAttribute('done')); 
        console.log(object);

        itemsArray.push(object);
        for (let i in itemsArray) {
            object.id = parseInt(i);
            todoItem.item.id = parseInt(i);
            
        } 
       
        console.log(itemsArray);
        localStorage.setItem(key, JSON.stringify(itemsArray));

        todoList.append(todoItem.item);
    
        todoItemForm.input.value = ''; 

        todoItemForm.button.disabled = true;

    });
        data.forEach(item => {
         let todoNewItem = createTodoItem(item.name, item.done, key);
         if (todoNewItem.item.getAttribute('done') === 'true') {
            todoNewItem.item.classList.add('list-group-item-success');
        }
        
         todoList.append(todoNewItem.item);
        })
        window.createTodoApp = createTodoApp;
    }
