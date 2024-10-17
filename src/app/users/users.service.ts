import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrlUsers = environment.baseUrlUsers


  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrlUsers}`);
  }

  getUserById(idUser: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrlUsers}/${ idUser }`);
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrlUsers}`, user);
  }

  editUser(user: IUser, idUser: number): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrlUsers}/${ idUser }`, user);
  }

  deleteUser(idUser: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrlUsers}/${ idUser }`);
  }

}
