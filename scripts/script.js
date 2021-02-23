'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');


let todoData = [
  {
    value: 'Kaffe zubereiten',
    completed: false
  },
  {
    value: 'Geschirr sauber machen, abspuelen',
    completed: true
  }
];

const saveTodo = function(){
  const setJson = JSON.stringify(todoData);
//  console.log(setJson);
  localStorage.setItem('todoData', setJson);
};

const render = function(){
  const getJson = localStorage.getItem('todoData');
//  console.log(getJson);
  todoData = JSON.parse(getJson);
  if (todoData === null){
    todoData = [];
  }
  todoList.textContent = '';
  todoCompleted.textContent = '';
// console.log(todoData);
  if (todoData){
    todoData.forEach(function(item){
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>';
        if (item.completed) {
          todoCompleted.append(li);  
        } else {
          todoList.append(li);
        }
      const BtnTodoRemove = li.querySelector('.todo-remove');
      BtnTodoRemove.addEventListener('click', function(){
        const text = li.querySelector('.text-todo').innerText;
        let num = 0;
        todoData.forEach(function(item){
        if (item.value === text){
//        console.log('num ', num, ', ', todoData[num]);
          todoData.splice(num, 1);
  
        }
        num = num + 1;
        });
        saveTodo();
        render();
      });
  
      const BtnTodoComplete = li.querySelector('.todo-complete');
      BtnTodoComplete.addEventListener('click', function(){
        item.completed = !item.completed;
        saveTodo();
        render();
      });
           
    });

  }
  saveTodo();
};

todoControl.addEventListener('submit', function(event){
  event.preventDefault();
  if (headerInput.value.trim() !== ''){
  const newTodo = {
    value: headerInput.value, 
    completed: false
  };

  todoData.push(newTodo);
  headerInput.value = '';
  saveTodo();
  render();
  }
});



render();

