import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    MainComponent,
    
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class MainModule { }
