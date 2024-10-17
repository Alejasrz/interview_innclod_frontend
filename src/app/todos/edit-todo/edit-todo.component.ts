import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITodo } from 'src/app/interfaces/todo.interface';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent {
  form : FormGroup;
  todo: ITodo;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditTodoComponent>,
              private _todosService: TodosService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any
  ){

    this.todo = this.data.todo;
    
    this.form = this.fb.group({
      title: ['', Validators.required],
      userId: [''],
      completed: [false]
    })

  }

  ngOnInit() {    
    this.updateForm();
  }

  updateForm() {
    this.form.patchValue(this.todo);    
  }

  editTodo(){
    if (this.form.status === 'INVALID') {
      this.showErrorMessage('Invalid form');
      return;
    }

    const todoToSend: ITodo = this.form.value;
    const idTodo: any = this.todo.id;

    this._todosService.editTodo(todoToSend, idTodo).subscribe({
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
