import './index.scss';
import 'normalize.css';


import knockout from 'knockout';


class Course {
  constructor(title, price) {
    this.title = knockout.observable(title);
    this.price = knockout.observable(price);
  }
}

class Customer {
  constructor() {
    this.name = knockout.observable('Guest');
    this.location = knockout.observable('Moscow');
    this.info = knockout.computed(() => `Привет ${this.name()} из ${this.location()}`);
    this.coursesList = knockout.observableArray([
      new Course('hhh', 111),
      new Course('aaa', 222),
      new Course('bbbb', 333),
      new Course('ccc', 444),
    ]);
  }

  getName() {
    const name = prompt('как вас зовут', this.name());
    this.name(name);
  }

  getLocation() {
    const location = prompt('location', this.location());
    this.location(location);
  }
}


knockout.applyBindings(new Customer());

