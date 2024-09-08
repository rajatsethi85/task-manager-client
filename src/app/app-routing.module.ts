import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "admin", loadChildren:()=> import("./modules/admin/admin.module").then(e=> e.AdminModule)},
  {path: "contributor", loadChildren:()=> import("./modules/contributor/contributor.module").then(e=> e.ContributorModule)},
  {path: "", loadChildren:()=> import("./modules/shared/shared.module").then(e=> e.SharedModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
