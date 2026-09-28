import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from './services/todo';

// this is the root component for the application
// it is the first component that is loaded when the application starts
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('calendar-client');
  todos = signal<any[]>([]); // this is a property that will hold the list of todos
  private todoService: Todo; // this is a property that will hold the instance of the todoService
  // the constructor is called when the component is created, angular will inkject the todoService into the constructor when it creates an instance of the App component
  constructor(todoService: Todo) {
    this.todoService = todoService;
    // this.todos = this.todoService.getTodos();
    this.todoService.getTodos().subscribe((data) => {
      this.todos.set(data);
    });
  }
}
