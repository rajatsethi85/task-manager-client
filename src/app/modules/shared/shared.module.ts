import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterailModule } from 'src/app/angular-material.modules';


@NgModule({
  declarations: [
    ViewTaskDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterailModule
  ]
})
export class SharedModule { }
