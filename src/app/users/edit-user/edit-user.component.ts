import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  form : FormGroup;
  user: IUser;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditUserComponent>,
              private _usersService: UsersService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public dataUser: any
  ){

    this.user = this.dataUser.user;    

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

  ngOnInit() {    
    this.updateForm();
  }

  updateForm() {
    this.form.patchValue(this.user);    
  }

  editUser(){
    if (this.form.status === 'INVALID') {
      this.showErrorMessage('Invalid form');
      return;
    }

    const userToSend: IUser = this.form.value;
    const idUser: any = this.user.id;

    this._usersService.editUser(userToSend, idUser).subscribe({
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
