"use strict";

function createTitle() {
    const title = document.createElement('h1');
    title.textContent = 'Панель управления студентами';
    title.classList.add('mb-5', 'mt-5', 'text-center');
    return title;
}
function createBoxForForms() {
    const box = document.createElement('div');
    box.classList.add('row', 'd-flex', 'justify-content-between', 'align-items-start');
    return box;
}

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); 
const yyyy = today.getFullYear();

const todayFormatDefault = yyyy + '-' + mm + '-' + dd;
const todayFormatNew = dd + '.' + mm + '.' + yyyy;

function createFormForAdd() {
    const form = document.createElement('form');
    form.classList.add('col-lg-5','d-flex', 'flex-wrap', 'align-items-center', 'mb-5');
    let input;
    
    const placeholdersArray = ['Имя', 'Фамилия', 'Отчество', 'Дата рождения', 'Год начала обучения', 'Факультет'];
    const typesArray = ['text', 'text', 'text', 'date', 'number', 'text'];
    const namesArray = ['name', 'surname', 'middle name', 'date of birth', 'year of the start of learning', 'faculty'];
    const pattern = ['^[А-ЯЁ][а-яё]{1,29}', '^[А-ЯЁ][а-яё]{1,29}', '^[А-ЯЁ][а-яё]{1,29}', '', '', '^[А-ЯЁ][а-яё]{1,29}'];
    const minsArray = ['', '', '', '1900-01-01', 2000, ''];
    const maxsArray = ['', '', '', todayFormatDefault, today.getFullYear(), ''];

    for (let i = 0; i <= 5; i++) {
    input = document.createElement('input');
    input.classList.add('form-control', 'mb-3');
    input.placeholder = placeholdersArray[i];
    input.setAttribute('type', typesArray[i]);
    input.setAttribute('pattern', pattern[i]);
    input.setAttribute('min', minsArray[i]);
    input.setAttribute('max', maxsArray[i]);
    input.setAttribute('required', '');
    input.setAttribute('name', namesArray[i]);
    form.append(input);
    }
    
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-success');
    button.textContent = 'Добавить студента';
    button.setAttribute('type', 'submit');
    
    form.append(button);

    return {
        form,
        button
    }
}

function createFormForFilter() {
    const form = document.createElement('form');
    form.classList.add('col-lg-5','d-flex', 'flex-wrap', 'align-items-center', 'justify-content-between', 'mb-5');
    let input;
    
    const placeholdersArray = ['Фамилия Имя Отчество', 'Факультет', 'Год начала обучения', 'Год окончания обучения'];
    const typesArray = ['text', 'text', 'number', 'number'];
    const namesArray = ['full name', 'faculty', 'year of the start of learning', 'year of the finish of learning'];
    const pattern = ['([А-ЯЁ][а-яё]{1,29})|([А-ЯЁ][а-яё]{1,29} [А-ЯЁ][а-яё]{1,29})|([А-ЯЁ][а-яё]{1,29} [А-ЯЁ][а-яё]{1,29} [А-ЯЁ][а-яё]{1,29})', '^[А-ЯЁ][а-яё]{1,29}', '', ''];
    const minsArray = ['', '', 2000, 2004];
    const maxsArray = ['', '', today.getFullYear(), (today.getFullYear() + 4)];

    for (let i = 0; i <= 3; i++) {
    input = document.createElement('input');           
    input.classList.add('form-control', 'mb-4');        
    input.placeholder = placeholdersArray[i];
    input.setAttribute('type', typesArray[i]);
    input.setAttribute('name', namesArray[i]);
    input.setAttribute('pattern', pattern[i]);        
    input.setAttribute('min', minsArray[i]);
    input.setAttribute('max', maxsArray[i]);
    form.append(input);
    }
    
    const buttonAdd = document.createElement('button');
    buttonAdd.classList.add('btn', 'btn-success');
    buttonAdd.textContent = 'Применить фильтр';
    buttonAdd.setAttribute('type', 'submit');
    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('btn', 'btn-success');
    buttonDelete.textContent = 'Отменить фильтр';
    
    form.append(buttonAdd);
    form.append(buttonDelete)

    return {
        form,
        buttonAdd,
        buttonDelete
    }
}

function createBasicTable() {
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const rowHead = document.createElement('tr');
    const tableBody = document.createElement('tbody');
    
    table.classList.add('table', 'table-bordered', 'table-hover', 'table-striped', 'mb-5');
    const textRowHeadArray = ['№','Фамилия Имя Отчество', 'Факультет', 'Дата рождения (возраст)', 'Годы обучения (номер курса)'];
    const dataType = ['number', 'string', 'string', 'date', 'year'];
    let columnHead;

    for (let i=0; i <= 4; i++) {
     columnHead = document.createElement('th');
     columnHead.textContent = textRowHeadArray[i];
     columnHead.dataset.type = dataType[i];
     columnHead.classList.add('cursor-pointer');
     rowHead.append(columnHead);
    }

    tableHead.append(rowHead);
    table.append(tableHead);
    table.append(tableBody);
    
    return {
        table,
        tableHead,
        rowHead,
        tableBody
    }
}

function createTable (array) {
 for(let i=0; i <= array.length-1; i++) {

   const rowBody = document.createElement('tr');
   const fragmentBody = document.createDocumentFragment();
   const columnsBodyArray = []; 
   const columnBody0 = document.createElement('td');
   columnBody0.textContent = i+1;
   columnsBodyArray.push(columnBody0);
   const columnBody1 = document.createElement('td');
   const fullName = array[i].surname + ' ' + array[i].name + ' ' + array[i].middleName;
   columnBody1.textContent = fullName;
   columnsBodyArray.push(columnBody1);
   const columnBody2 = document.createElement('td');
   columnBody2.textContent = array[i].faculty;
   columnsBodyArray.push(columnBody2);
   const columnBody3 = document.createElement('td');

   function reverseStr(str) {
        return str.split("-").reverse().join(".");
    }

    let now = new Date(today.getFullYear(), today.getMonth(), today.getDate()); 
    let dob = new Date(array[i].dateOfBirth); 
    let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); 
    let age; 
    
    age = now.getFullYear() - dob.getFullYear();
    
    if (now < dobnow) {
      age = age-1;
    }
    
   let ageString = age.toString().slice(-1);
  
  if (10 < age < 15) {
    if (0 < Number(ageString) <= 4)   {
      columnBody3.textContent = (reverseStr(array[i].dateOfBirth)) + ' ' + '(' + age +' ' + 'лет' + ')';
    }
  }
  if (age === 1) {
    columnBody3.textContent = (reverseStr(array[i].dateOfBirth)) + ' ' + '(' + age +' ' + 'год' + ')';
  }
  else if (age < 11 || age > 14) {
    if (1 < Number(ageString) <= 4) {
      columnBody3.textContent = (reverseStr(array[i].dateOfBirth)) + ' ' + '(' + age +' ' + 'годa' + ')';
      }
     if ((Number(ageString)) === 1) {
     columnBody3.textContent = (reverseStr(array[i].dateOfBirth)) + ' ' + '(' + age +' ' + 'год' + ')';
   }
    
     if (Number(ageString) > 4) {
      columnBody3.textContent = (reverseStr(array[i].dateOfBirth)) + ' ' + '(' + age +' ' + 'лет' + ')';
    }
    if (Number(ageString) === 0) {
      columnBody3.textContent = (reverseStr(array[i].dateOfBirth)) + ' ' + '(' + age +' ' + 'лет' + ')';
    }
  }
   
   columnsBodyArray.push(columnBody3);
   const columnBody4 = document.createElement('td');
   let currentCourse = today.getFullYear() - array[i].yearStartLearning;
   if (currentCourse <= 4) {
   columnBody4.textContent = array[i].yearStartLearning + '-' + 
   (array[i].yearStartLearning + 4) + ' ' 
   + '(' + currentCourse
    + ' ' + 'курса' + ')';
   }
   if (currentCourse > 4 || (currentCourse === 4 && (today.getMonth() + 1) >= 9)) {
    columnBody4.textContent = array[i].yearStartLearning + '-' + 
    (array[i].yearStartLearning + 4) + ' ' 
    + '(закончил(a))';
   }
   columnsBodyArray.push(columnBody4);
   for (let i of columnsBodyArray) {
   fragmentBody.appendChild(i);
   }
   rowBody.append(fragmentBody);
   const tbody = document.querySelector('tbody');
   tbody.append(rowBody);
  }
}

let currentArray = [];

let startArray;

startArray = [
  {name: 'Иван', 
  surname: 'Пташкин', 
  middleName: 'Владимирович', 
  dateOfBirth: '1991-02-05', 
  yearStartLearning: 2017, 
  faculty: 'Маркетинг'},
  {name: 'Людмила', 
  surname: 'Курочкина', 
  middleName: 'Алексеевна', 
  dateOfBirth: '1986-09-19', 
  yearStartLearning: 2005, 
  faculty: 'Дизайн'},
  {name: 'Юля', 
  surname: 'Соколова', 
  middleName: 'Константиновна', 
  dateOfBirth: '2009-08-24', 
  yearStartLearning: 2019, 
  faculty: 'Программирование'}
];

function createСontrolPanelApp(container) {
     
    const controlPanelTitle = createTitle();
    const boxForForms = createBoxForForms();
    const formForAdd = createFormForAdd();
    const formForFilter = createFormForFilter();
    const basicTable = createBasicTable();
    
    container.append(controlPanelTitle);
    boxForForms.append(formForAdd.form);
    boxForForms.append(formForFilter.form);
    container.append(boxForForms);
    container.append(basicTable.table);
    
    if (startArray !== undefined) {
    for(let i of startArray) {
      currentArray.push(i);
    }
  }

    let data = localStorage.getItem('controlPanel') ? JSON.parse(localStorage.getItem('controlPanel')) : [];
    for(let i of data) {
      currentArray.push(i);
    }
    
    if (startArray !== undefined) {
       if(currentArray.length > startArray.length) {
       currentArray.splice(0, startArray.length);
       }
    }

    createTable(currentArray);

basicTable.table.onclick = function(event) {
  let th = event.target; 

  if (th.tagName != 'TH') return; 

  sortGrid(th.cellIndex, th.dataset.type);
};

function sortGrid(colNum, type) {
  const rowsArray = Array.from(basicTable.tableBody.rows);
  let compare;

  switch (type) {
    case 'number':
      compare = function(rowA, rowB) {
        return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
      };
      break;
    case 'string':
      compare = function(rowA, rowB) {
        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
      };
      break;
      case 'date':
      compare = function(rowA, rowB) {
        
      const rowDateA = rowA.cells[colNum].textContent.slice(0, 10);
      const rowDateB = rowB.cells[colNum].textContent.slice(0, 10);

        function reverseStr(str) {
          return str.split(".").reverse().join("-");
      }
        
      const reverseDateA = reverseStr(rowDateA);
      const reverseDateB = reverseStr(rowDateB);

        let dateA = new Date(reverseDateA); 
        let dateB = new Date(reverseDateB); 
        return dateA - dateB;
      };
      break;
      case 'year':
      compare = function(rowA, rowB) {
      
      const rowDateA = rowA.cells[colNum].textContent.slice(0, 4);
      const rowDateB = rowB.cells[colNum].textContent.slice(0, 4);

      const numberDateA = Number(rowDateA);
      const numberDateB = Number(rowDateB);
        
      return numberDateA - numberDateB;

      };
      break;
  }

  rowsArray.sort(compare);

  basicTable.tableBody.append(...rowsArray);
}

       
    formForAdd.form.addEventListener('submit',  (e) => {

    e.preventDefault();

    let newObject = {name: formForAdd.form[0].value, 
                    surname: formForAdd.form[1].value, 
                    middleName: formForAdd.form[2].value, 
                    dateOfBirth: formForAdd.form[3].value, 
                    yearStartLearning: Number(formForAdd.form[4].value), 
                    faculty: formForAdd.form[5].value};

    currentArray.push(newObject);

    localStorage.setItem('controlPanel', JSON.stringify(currentArray));

    basicTable.tableBody.innerHTML = '';

    createTable(currentArray);

    for(let i=0; i <= formForAdd.form.length-1; i++) {
    formForAdd.form[i].value = ''; 
    }
       
    });


    formForAdd.button.addEventListener('click',  (e) => {
      
        function CustomValidation() { }

CustomValidation.prototype = {
  
  invalidities: [],

  checkValidity: function(input) {

    let validity = input.validity;
    
    const max = input.getAttribute('max');
    const min = input.getAttribute('min');

    if (validity.valueMissing) {
       this.addInvalidity('Все поля в данной форме должны быть заполнены.');
    }

    if (validity.patternMismatch) {
      this.addInvalidity('Для ввода доступны только буквы русского алфавита, без пробелов и других символов! Первая буква заглавная, остальные в нижнем регистре. Пожалуйста, введите от 2-х до 30-ти букв.');
    }                     
                        
    if (validity.rangeOverflow) {
      if(input.getAttribute('type') === 'date') {
        this.addInvalidity('Значение должно быть в пределах от ' + '01.01.1900' + ' ' + 'до ' + todayFormatNew + '.');
      }
      else {
      this.addInvalidity('Значение должно быть в пределах от ' + min + ' ' + 'до ' + max + '.');
      }
    }

    if (validity.rangeUnderflow) {
      if(input.getAttribute('type') === 'date') {
        this.addInvalidity('Значение должно быть в пределах от ' + '01.01.1900' + ' ' + 'до ' + todayFormatNew + '.');
      }
      else {
      this.addInvalidity('Значение должно быть в пределах от ' + min + ' ' + 'до ' + max + '.');
      }
    }
  },

  addInvalidity: function(message) {
    this.invalidities.push(message);
  },

  getInvalidities: function() {
    return this.invalidities;
  }
};

        for (let i = 0; i < formForAdd.form.length-1; i++) {
            
            let input = formForAdd.form[i];
              
            if (input.checkValidity() == false) {
              let inputCustomValidation = new CustomValidation(); 
              inputCustomValidation.checkValidity(input); 
              let customValidityMessage = inputCustomValidation.getInvalidities(); 
              input.setCustomValidity(customValidityMessage); 
            } 

          } 
    });

    formForFilter.form.addEventListener('submit',  (e) => {
        
        e.preventDefault();

        const filtersArrayTotal = [];
        
        const filterArray1 = [];
        const filterArray2 = [];
        const filterArray3 = [];
        const filterArray4 = [];

        for (let object of currentArray) {
        for (let i=0; i <= formForFilter.form.length-2; i++) {
          if (formForFilter.form[i].value !== '') {
                 switch (i) {
                  case 0:
                    const fullName = object.surname + ' ' + object.name + ' ' + object.middleName;
                    if (fullName.includes(formForFilter.form[i].value)) {
                      filterArray1.push(object);
                    };
                    break;
                  case 1:
                    if (String(object.faculty).includes(formForFilter.form[i].value)) {
                      filterArray2.push(object);
                    };
                    break;
                  case 2:
                    if (String(object.yearStartLearning) === formForFilter.form[i].value) {
                      filterArray3.push(object);
                    };
                    break;
                  case 3:
                    let yearEndLearning = object.yearStartLearning + 4;
                    if (yearEndLearning === Number(formForFilter.form[i].value)) {
                      filterArray4.push(object);
                    };
                    break;
                  }       
             }
          }
        }
      
        filtersArrayTotal.push(filterArray1, filterArray2, filterArray3, filterArray4);

        const notEmptyFiltersArray = filtersArrayTotal.filter((item) => {
          return item.length !== 0;
        })

        const lastFilterArray = notEmptyFiltersArray[notEmptyFiltersArray.length-1];

        if (lastFilterArray !== undefined) {
        const uniqueArray = lastFilterArray.filter((item, index) => {
      
          return index === lastFilterArray.findIndex(obj => {
           
            return JSON.stringify(obj) === JSON.stringify(item);
          });
        });

        basicTable.tableBody.innerHTML = '';
        createTable(uniqueArray);
      }
      else {
        basicTable.tableBody.innerHTML = 'Ничего не найдено!';
      }

        for (let i=0; i <= formForFilter.form.length-2; i++) {
          formForFilter.form[i].value = ''; 
        }
          
    });


    formForFilter.buttonAdd.addEventListener('click',  (e) => {
      
        function CustomValidation() { }

CustomValidation.prototype = {
  
  invalidities: [],

  checkValidity: function(input) {

    let validity = input.validity;
    
    const max = input.getAttribute('max');
    const min = input.getAttribute('min');

    if (validity.patternMismatch) {
      this.addInvalidity('Используйте буквы только русского алфавита! Пожалуйста, введите от 1-ого до 3-х слов. Первая буква каждого слова заглавная, остальные в нижнем регистре. Каждое слово в конце должно отделяться пробелом и содержать от 2-х до 30-ти букв.');
    }

    if (validity.rangeOverflow) {
      this.addInvalidity('Значение должно быть в пределах от ' + min + ' ' + 'до ' + max + '.');
    }

    if (validity.rangeUnderflow) {
      this.addInvalidity('Значение должно быть в пределах от ' + min + ' ' + 'до ' + max + '.');
    }
  },

  addInvalidity: function(message) {
    this.invalidities.push(message);
  },

  getInvalidities: function() {
    return this.invalidities;
  }
};

function validation() {
  if (!formForFilter.form[0].value && !formForFilter.form[1].value && !formForFilter.form[2].value && !formForFilter.form[3].value) {
    formForFilter.form[0].setCustomValidity ('Введите хотя бы один фильтр'); 
  }
}
        
        for (let i = 0; i < formForFilter.form.length-2; i++) {
          
            let input = formForFilter.form[i];

            input.addEventListener("input", validation);
              
              validation();
           
            if (input.checkValidity() == false) {
               
              let inputCustomValidation = new CustomValidation(); 
              inputCustomValidation.checkValidity(input); 
              let customValidityMessage = inputCustomValidation.getInvalidities(); 
              input.setCustomValidity(customValidityMessage); 
            } 

          } 
    });

    formForFilter.buttonDelete.addEventListener('click',  (e) => {
      e.preventDefault();
      basicTable.tableBody.innerHTML = '';
      createTable(currentArray);
    });
}