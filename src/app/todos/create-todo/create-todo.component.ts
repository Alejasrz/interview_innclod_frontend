import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../todos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITodo } from 'src/app/interfaces/todo.interface';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent {
  form : FormGroup;
  userId!: number;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<CreateTodoComponent>,
              private _todosService: TodosService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any
  ){

    this.userId = parseInt(this.data.userId);
    
    this.form = this.fb.group({
      title: ['', Validators.required],
      userId: [''],
      completed: [false]
    })

    this.form.get('userId')?.setValue(this.userId);

  }

  saveTodo(){
    if (this.form.status === 'INVALID') {
      this.showErrorMessage('Invalid form');
      return;
    }

    const todoToSend: ITodo = this.form.value;

    this._todosService.createTodo(todoToSend).subscribe({
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
