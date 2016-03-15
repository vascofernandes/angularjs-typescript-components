let ngModule = 'test';

angular.module(ngModule, []);

class Todo {
  constructor(private description: string) {}
}

//--------------------------------------------------------------------
// Todo Service
class TodoService {
  todos = [new Todo('Get Milk'), new Todo('Drink Milk')];
  
  getTodos() {
    return this.todos;
  }
  deleteTodo(todo: Todo) {
    console.log('Deleting', todo);
    var idx = this.todos.indexOf(todo);
    if (idx >= 0) {
      this.todos.splice(idx, 1);
    }
  };
}
angular.module(ngModule).service('todoService', TodoService);

//--------------------------------------------------------------------
// App Component
class NgApp {
  template = `<todo-list />`;
  bindings = {};
  controller = App;
  controllerAs = 'vm';
}
class App {
}
angular.module(ngModule).component('app', new NgApp)

//--------------------------------------------------------------------
// Todo List
class NgTodoList {
  template = `
  <ul>
    <li ng-repeat="todoItem in vm.todos">
        <todo-item todo="todoItem"
                   on-deleteit="vm.deleteit(todoItem)"
                   on-test="vm.test"
                   on-emit="vm.myEvent(info, ev)"/>
    </li>  
  </ul>`;
  bindings = {};
  controller = TodoList;
  controllerAs = 'vm';
}
class TodoList {
  todos: Todo[];
  static $inject = ['todoService'];
  constructor (private todoService: TodoService) {
    this.todos = this.todoService.getTodos();
  }
  test(data) {
    console.log(data);
  }
  deleteit(todoItem: Todo) {
    this.todoService.deleteTodo(todoItem);
  }
  myEvent(info, ev) {
    console.log(info, ev.toString());
  }
}
angular.module(ngModule).component('todoList', new NgTodoList)

//--------------------------------------------------------------------
// < - input
// & - output
// Todo Item
class NgTodoItem {
  template = `
  <div>
      {{vm.todo.description}}
      <button ng-click="vm.onDeleteit()">Delete</button>
      <button ng-click="vm.onTest(vm.todo)">Test</button>
      <button ng-click="vm.onEmiter({info: 'cool', ev: $event})">Event</button>
  </div>`;
  bindings = { todo: '<', onDeleteit: '&', onTest: '<', onEmit: '&'};
  controller = TodoItem;
  controllerAs = 'vm';
}
class TodoItem {
  constructor() {
  }
}
angular.module(ngModule).component('todoItem', new NgTodoItem)

//--------------------------------------------------------------------
// Bootstrap
angular.element(document).ready(function () {
  angular.bootstrap(document.body, [ngModule]);
});
