import './index.scss';
import 'normalize.css';


import knockout from 'knockout';


class Todo {
  constructor(title, value) {
    this.title = knockout.observable(title);
    this.value = knockout.observable(value);
    this.isChecked = knockout.observable(false);
  }
  as() {
    this.isChecked = !this.isChecked;
    console.log(this.isChecked);
  }
}

class Customer {
  constructor() {
    this.name = knockout.observable('Guest');
    this.location = knockout.observable('Moscow');
    this.info = knockout.computed(() => `Привет ${this.name()} из ${this.location()}`);
    this.todoList = knockout.observableArray([
      new Todo('hhh', 111),
      new Todo('aaa', 222),
      new Todo('bbbb', 333),
      new Todo('ccc', 100),
    ]);
  }

  doSomething(model) {
    // todo переделать
    this.todoList.push(new Todo(model.title.value, model.value.value));
    model.title.value = '';
    model.value.value = '';
    componentHandler.upgradeDom();
  }
  deleteTodo(todo) {
    this.todoList.remove(todo);
  }
}


knockout.applyBindings(new Customer());

