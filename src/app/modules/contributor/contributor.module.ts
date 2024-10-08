import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributorRoutingModule } from './contributor-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterailModule } from 'src/app/angular-material.modules';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ContributorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterailModule
  ]
})
export class ContributorModule { }
