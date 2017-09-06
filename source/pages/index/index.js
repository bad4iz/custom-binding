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
    this.sortGravityFlag = knockout.observable(0);
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
    this.sortGravityFlag(this.sortGravityFlag() > 0 ? -1 : 1);
    if ( this.sortGravityFlag() > 0 ) {
      this.todoList = this.todoList.sort((one, two) => two.gravity() - one.gravity());
    } else {
      this.todoList = this.todoList.sort((one, two) => one.gravity() - two.gravity() );
    }
    console.log(this.sortGravityFlag());

  }
  sortTitle() {
    this.todoList= this.todoList.sort(function (left, right) { return left.title() == right.title() ? 0 : (left.title() < right.title() ? -1 : 1) });
  }
  doSomething() {
    this.title() && this.todoList.push(new Todo(this.title(), this.gravity()));
    this.title(''); this.gravity('');
    componentHandler.upgradeDom();
  }
}
knockout.applyBindings(new Customer());

