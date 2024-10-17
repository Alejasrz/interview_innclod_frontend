import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITodo } from 'src/app/interfaces/todo.interface';
import { TodosService } from '../todos.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { DeleteTodoComponent } from '../delete-todo/delete-todo.component';
import { IUser } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-main-todos',
  templateUrl: './main-todos.component.html',
  styleUrls: ['./main-todos.component.css']
})
export class MainTodosComponent {
  displayedColumns: string[] = ['id', 'title', 'completed', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  todos!: ITodo[];
  idUser!: number;
  user!: IUser | null;

  constructor(private _todosService: TodosService,
              private _usersService: UsersService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(){
    this.getId();
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

  getId() {
    this.route.params.subscribe((params: any) => {
      this.idUser = params['id'];

      if(this.idUser) {
        this.getUserById(this.idUser);
        this.getTodosByIdUser(this.idUser);
      }
    })
  }

  getUserById(idUser: number) {
    this._usersService.getUserById(idUser).subscribe({
      next: (result: any) => {
        this.user = result;
      },
      error: (err: any) => {
        this.showMessage('Sorry, something went wrong.');
      }
    })
  }

  getTodosByIdUser(idUser: number){
    this._todosService.getAllTodosByIdUser(idUser).subscribe({
      next: (result: any) => {        
        this.todos = result;
        this.dataSource.data = this.todos;
      },
      error: (err: any) => {
        this.showMessage('Sorry, something went wrong.');
      }
    })
  }

  backToUsers() {
    this.router.navigate(['/main/users']);
  }

  createTodo(){
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      width: '400px',
      disableClose: true,
      data: {
        userId: this.idUser
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {        
        const newTodo: ITodo = result;
        
        this.todos.push(newTodo);
        this.dataSource.data = this.todos;

        this.showMessage('The task has been successfully created');
      }
    });
  }

  editTodo(todo: ITodo) {

    const dialogRef = this.dialog.open(EditTodoComponent, {
      width: '400px',
      disableClose: true,
      data: {
        todo: todo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const editedTodo: ITodo = result;

        const indexTodo = this.todos.findIndex(todo => todo.id === editedTodo.id); 
        
        if(indexTodo !== -1) {

          this.todos[indexTodo] = editedTodo;
          this.dataSource.data = this.todos;

          this.showMessage('The task has been successfully updated');
        }
      }
    });
  }

  deleteTodo(idTodo: number){

    const dialogRef = this.dialog.open(DeleteTodoComponent, {
      width: '400px',
      disableClose: true,
      data: {
        idTodo: idTodo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const indexTodo = this.todos.findIndex(todo => todo.id === idTodo);

        if(indexTodo !== -1) {
       
          this.todos.splice(indexTodo, 1)
          this.dataSource.data = this.todos;

          this.showMessage('The task has been successfully deleted');
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
