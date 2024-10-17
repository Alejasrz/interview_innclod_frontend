import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  form : FormGroup;


  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<CreateUserComponent>,
              private _usersService: UsersService,
              private _snackBar: MatSnackBar,
  ){
    
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [''],
        suite: [''],
        city: [''],
        zipcode: [''],
        geo: this.fb.group({
          lat: [''],
          lng: [''],
        })
      }),
      phone: [''],
      website: [''],
      company: this.fb.group({
        name: [''],
        catchPhrase: [''],
        bs: ['']
      })
    })

  }

  saveUser(){
    if (this.form.status === 'INVALID') {
      this.showErrorMessage('Invalid form');
      return;
    }

    const userToSend: IUser = this.form.value;

    this._usersService.createUser(userToSend).subscribe({
      next: (result: any) => {
        this.dialogRef.close(result);
      },
      error: (err: any) => {
        this.dialogRef.close(null);
        this.showErrorMessage('Sorry, something went wrong.');
      }
    })   
  }

  onCancel(){
    this.dialogRef.close(null);
  }

  showErrorMessage(message: string){
    this._snackBar.open(message, '', {
      duration: 3000
    });
  }

}
