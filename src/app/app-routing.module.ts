import { EmployeeAddComponent } from "./components/employee-add/employee-add.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { RouterModule, Routes } from "@angular/router";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {EmployeeEditComponent} from "./components/employee-edit/employee-edit.component";
import {LoginComponent} from "./components/login/login.component";
import {ProjectListComponent} from "./components/project-list/project-list.component";
import {ProjectAddComponent} from "./components/project-add/project-add.component";
import {ProjectEditComponent} from "./components/project-edit/project-edit.component";
import {ContactSiteComponent} from "./components/contact-site/contact-site.component";
 const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'employee-add', component: EmployeeAddComponent },
   {path: 'employee-list', component: EmployeeListComponent},
   {path: 'employee-edit/:id', component: EmployeeEditComponent},
   {path: 'login', component: LoginComponent},
   {path: 'project-list', component: ProjectListComponent},
   {path: 'project-add', component: ProjectAddComponent},
   {path: 'project-edit/:id', component: ProjectEditComponent},
   {path: 'contact', component: ContactSiteComponent},
];
 @NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
