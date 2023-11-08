import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

  fetchData(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:8080/api/todo');
  }
  postData(todo: Todo): Observable<Todo[]> {
    return this.http.post<Todo[]>('http://localhost:8080/api/todo/add',todo);
  }
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/todo/delete/${id}`);
  }
  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>('http://localhost:8080/api/todo/update', updatedTodo);
  }

}
