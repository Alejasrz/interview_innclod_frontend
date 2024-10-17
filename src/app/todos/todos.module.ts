import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { MainTodosComponent } from './main-todos/main-todos.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { DeleteTodoComponent } from './delete-todo/delete-todo.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodosService } from './todos.service';
import { UsersService } from '../users/users.service';


@NgModule({
  declarations: [
    MainTodosComponent,
    CreateTodoComponent,
    EditTodoComponent,
    DeleteTodoComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    HttpClientModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  providers: [TodosService, UsersService]
})
export class TodosModule { }
