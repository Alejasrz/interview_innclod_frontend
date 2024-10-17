import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTodosComponent } from './main-todos/main-todos.component';

const routes: Routes = [
  {
    path: '',
    component: MainTodosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
