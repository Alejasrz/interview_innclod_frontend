import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged(){
    return localStorage.getItem('isLogged') === 'true';
  }

  removeLocalStorage() {
    localStorage.removeItem('isLogged');
  }
}

