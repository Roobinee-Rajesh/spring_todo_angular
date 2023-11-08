import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit{
  todos: Todo[] = [];
  newTodo: Todo = { id:0,todo: '' };
  // updatedTodo: Todo = { id: 0, todo: '' }; 
  
  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.fetchData().subscribe({
      next: (todo) => (this.todos = todo),
      complete: () => console.log('No more todo'),
      error: (err) => console.error(err),
    });
    
  }


  
  addTodo(id:number) {
    // console.log(this.newTodo);
    if(id==0){
    this.todoService.postData(this.newTodo).subscribe({
      next: (todo) => {
        this.todos.push(this.newTodo);
        this.newTodo = { todo: '' };
        this.ngOnInit();
      },
      error: (err) => console.error(err),
    });
  }
  else{
    this.editTodo(id);
  }
  }

  editTodo(id:number) {
    // console.log(this.updatedTodo.todo);
    this.newTodo.id=id;
    // console.log(this.updatedTodo.id);
    
    this.todoService.updateTodo(this.newTodo).subscribe(
      (todo) => {
        console.log('Todo updated successfully.'); 
        this.newTodo = { id:0,todo: '' }; 
        this.ngOnInit();    },
      (error) => {
        console.error('Error updating todo:', error);
      }
    );
  }
  

  deleteTodo(id:number) {
    this.todoService.deleteTodo(id).subscribe(
      () => {
        console.log('Todo deleted successfully.');
        this.ngOnInit();
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }

}
