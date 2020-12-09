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
    };
}

let startList = [{name: 'построить дом', done: true}, 
                     {name: 'вырастить сына', done: true}, 
                     {name: 'посадить дерево', done: 'false'}];

function createTodoItem(name) {
    let item = document.createElement('li');
    let containerItem = document.createElement('div');
    let buttonDone = document.createElement('button');
    let buttonDelete = document.createElement('button'); 


    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;
    item.setAttribute('done', 'false');
    containerItem.classList.add('btn-group', 'btn-group-sm');
    buttonDone.classList.add('btn', 'btn-success');
    buttonDone.textContent = 'Готово';
    buttonDelete.classList.add('btn', 'btn-danger');
    buttonDelete.textContent = 'Удалить';


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


function createTodoApp(container, title) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

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
    
        let todoItem = createTodoItem(todoItemForm.input.value);


        todoItem.buttonDone.addEventListener('click', function() {
            todoItem.item.classList.toggle('list-group-item-success');
            todoItem.item.setAttribute('done', 'true');
            
        });

        todoItem.buttonDelete.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {
            todoItem.item.remove();
            }
        })

       todoList.append(todoItem.item);
    
        todoItemForm.input.value = ''; 

        todoItemForm.button.disabled = true;
    });
}



