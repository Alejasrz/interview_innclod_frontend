import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'todos/:id',
        loadChildren: () => import('../todos/todos.module').then(m => m.TodosModule),
        canActivate: [AuthGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
