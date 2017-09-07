import './index.scss';
import 'normalize.css';

import knockout from 'knockout';

class Todo {
  constructor(title, gravity, isChecked = false) {
    this.title = knockout.observable(title);
    this.gravity = knockout.observable(gravity);
    this.isChecked = knockout.observable(isChecked);
  }
  check() {
    this.isChecked(!this.isChecked());
    componentHandler.upgradeDom();
  }
}

class Customer {
  constructor() {
    this.title = knockout.observable();
    this.gravity = knockout.observable();
    this.sortGravityFlag = knockout.observable(0);
    this.sortTitleFlag = knockout.observable(0);
    this.todoList = knockout.observableArray();
    this.deleteTodo = (todo) => {
      this.todoList.remove(todo);
    };
    this.currentFilter = knockout.observable();
    this.filterTodo = knockout.computed(() => {
      if (!this.currentFilter()) {
        componentHandler.upgradeDom();
        return this.todoList();
      }
      return knockout.utils.arrayFilter(this.todoList(), todo => ~todo.title().indexOf(this.currentFilter()));
    });
  }
  sortGravity() {
    this.sortTitleFlag(0);
    this.sortGravityFlag(this.sortGravityFlag() > 0 ? -1 : 1);
    if (this.sortGravityFlag() > 0) {
      this.todoList = this.todoList.sort((one, two) => two.gravity() - one.gravity());
    } else {
      this.todoList = this.todoList.sort((one, two) => one.gravity() - two.gravity());
    }
  }
  sortTitle() {
    this.sortGravityFlag(0);
    this.sortTitleFlag(this.sortTitleFlag() > 0 ? -1 : 1);
    if (this.sortTitleFlag() > 0) {
      this.todoList = this.todoList.sort((one, two) => (one.title() === two.title() ? 0 : (one.title() < two.title() ? -1 : 1)));
    } else {
      this.todoList = this.todoList.sort((one, two) => (one.title() === two.title() ? 0 : (one.title() < two.title() ? 1 : -1)));

    }
  }
  doSomething() {
    this.title() && this.todoList.push(new Todo(this.title(), this.gravity()));
    this.title(''); this.gravity('');
    console.log(knockout.toJSON(this.todoList));
    componentHandler.upgradeDom();
  }
}

const customer = new Customer();

knockout.applyBindings(customer);


fetch('arr.json')
  .then(response => response.json())
  .then((data) => {
    data.forEach((item) => {
      customer.todoList.push((new Todo(item.title, item.gravity, item.isChecked)));
    });
    componentHandler.upgradeDom();
  })
  .catch(alert);

