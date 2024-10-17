import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form : FormGroup;


  constructor(private fb: FormBuilder, 
              private _snackBar: MatSnackBar,
              private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required , Validators.minLength(6)] ]
    })

  }

  onLogin(){

    if (this.form.status === 'INVALID') {
      this.showErrorMessage('Invalid form');
      return;
    } else {

      const validEmail: string = 'admin@gmail.com';
      const validPassword: string = 'admin1234';
  
      if (this.form.value.email !== validEmail && this.form.value.password !== validPassword ) {
        this.showErrorMessage('The email or password is not correct');
        return;
      }
    }

    localStorage.setItem('isLogged', 'true');
    this.router.navigate(['/main']);
  }

  showErrorMessage(message: string){
    this._snackBar.open(message, '', {
      duration: 3000
    });
  }
}



