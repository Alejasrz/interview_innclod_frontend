import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

  idUser: number;

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
              private _usersService: UsersService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public dataUser: any
  ){
    this.idUser = this.dataUser.idUser;
  }

  deleteUser(){
    this._usersService.deleteUser(this.idUser).subscribe({
      next: (result: any) => {
        this.dialogRef.close(true);
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
