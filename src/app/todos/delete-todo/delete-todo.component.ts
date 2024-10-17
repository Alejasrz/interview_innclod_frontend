import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.css']
})
export class DeleteTodoComponent {

  idTodo: number;

  constructor(public dialogRef: MatDialogRef<DeleteTodoComponent>,
              private _todosService: TodosService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.idTodo = this.data.idTodo;
  }

  deleteTodo(){
    this._todosService.deleteTodo(this.idTodo).subscribe({
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
