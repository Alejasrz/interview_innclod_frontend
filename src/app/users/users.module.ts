import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainUsersComponent } from './main-users/main-users.component';
import { UsersRoutingModule } from './users-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './users.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    MainUsersComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    MatSnackBarModule
   
  ],
  providers: [UsersService]
})
export class UsersModule { }
