import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITodo } from '../interfaces/todo.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  baseUrlTodos = environment.baseUrlTodos

  constructor(private http: HttpClient) { }

  getAllTodosByIdUser(idUser: number): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.baseUrlTodos}?userId=${ idUser }`);
  }

  createTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(`${this.baseUrlTodos}`, todo);
  }

  editTodo(todo: ITodo, idTodo: number): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.baseUrlTodos}/${ idTodo }`, todo);
  }

  deleteTodo(idTodo: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrlTodos}/${ idTodo }`);
  }
}
