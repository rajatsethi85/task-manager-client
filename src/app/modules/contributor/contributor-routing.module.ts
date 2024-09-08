import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewTaskDetailsComponent } from '../shared/components/view-task-details/view-task-details.component';

/**
* Routing module for contributor role users..
*/
const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "taskdetails/:id", component: ViewTaskDetailsComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributorRoutingModule { }
