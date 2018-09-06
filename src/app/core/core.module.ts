import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    AppRoutingModule,
    SharedModule,
    HeaderComponent
  ],
  declarations: [
    HeaderComponent,
    HomeComponent
  ]
})
export class CoreModule { }
