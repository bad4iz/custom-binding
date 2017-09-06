import './index.scss';
import 'normalize.css';


import knockout from 'knockout';


class Todo {
  constructor(title, gravity) {
    this.title = knockout.observable(title);
    this.gravity = knockout.observable(gravity);
    this.isChecked = knockout.observable(false);
  }
  check() {
    this.isChecked(!this.isChecked());
    componentHandler.upgradeDom();

    console.log(this.isChecked());
  }
}

class Customer {
  constructor() {
    this.title = knockout.observable();
    this.gravity = knockout.observable();
    this.todoList = knockout.observableArray([
      new Todo('hhh', 111),
      new Todo('aaa', 222),
      new Todo('bbbb', 333),
      new Todo('ccc', 100),
    ]);
    this.deleteTodo = (todo) => {
      this.todoList.remove(todo);
    };
  }
  sortGravity() {
    console.log(this.todoList.sort((one, two) => one.gravity - two.gravity));
    console.log(65416556);
  }
  sortTitle() {
    console.log(5);
  }
  doSomething() {
    this.title() && this.todoList.push(new Todo(this.title(), this.gravity()));
    this.title(''); this.gravity('');
    componentHandler.upgradeDom();
  }
}
knockout.applyBindings(new Customer());

