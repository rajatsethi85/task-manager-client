import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';

/**
* Routing module for shared module.
*/
const routes: Routes = [
  { path: "taskdetails/:id", component: ViewTaskDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
