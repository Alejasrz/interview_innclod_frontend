import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../users.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { IUser } from 'src/app/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-users',
  templateUrl: './main-users.component.html',
  styleUrls: ['./main-users.component.css']
})
export class MainUsersComponent {
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  users!: IUser[];

  constructor(private _usersService: UsersService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(){
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers(){
    this._usersService.getAllUsers().subscribe({
      next: (result: any) => {
        this.users = result;
        this.dataSource.data = this.users;
      },
      error: (err: any) => {
        this.showMessage('Sorry, something went wrong.');
      }
    })
  }

  
  viewTodos(idUser: number) {
    this.router.navigate([`/main/todos/${ idUser }`]);
  }

  createUser(){
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const newUser: IUser = result;
        
        this.users.push(newUser);
        this.dataSource.data = this.users;
        this.showMessage('The user has been successfully created');
      }
    });
  }


  editUser(user: IUser) {

    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '800px',
      disableClose: true,
      data: {
        user: user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const editedUser: IUser = result;

        const indexUser = this.users.findIndex(user => user.id === editedUser.id); // Encontramos el index de ese usuario
        
        if(indexUser !== -1) {
          // Si existe entonces reemplazamos por el usaurio editado
          this.users[indexUser] = editedUser;
          this.dataSource.data = this.users;
          this.showMessage('The user has been successfully updated');
        }
      }
    });
  }

  deleteUser(idUser: number){

    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '400px',
      disableClose: true,
      data: {
        idUser: idUser
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const indexUser = this.users.findIndex(user => user.id === idUser);

        if(indexUser !== -1) {
          // Si existe entonces elimina el campo que corresponde a ese indice
          this.users.splice(indexUser, 1)
          this.dataSource.data = this.users;
          this.showMessage('The user has been successfully deleted');
        }
      }
    });
  }

  showMessage(message: string){
    this._snackBar.open(message, '', {
      duration: 3000
    });
  }

}
