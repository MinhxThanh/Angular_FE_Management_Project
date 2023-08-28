import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, RouterOutlet} from "@angular/router";
import { MessageComponent } from './components/message/message.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import {RestApiService} from "./services/rest-api.service";
import {DataService} from "./services/data.service";
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './components/home/home.component';
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { LoginComponent } from './components/login/login.component';
import {JWT_OPTIONS, JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectAddComponent } from './components/project-add/project-add.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import {NgOptimizedImage} from "@angular/common";
import { TaskAddComponent } from './components/task/task-add/task-add.component';
import { TaskEditComponent } from './components/task/task-edit/task-edit.component';
import { ContactSiteComponent } from './components/contact-site/contact-site.component';
@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    EmployeeAddComponent,
    HomeComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    LoginComponent,
    ProjectListComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    TaskAddComponent,
    TaskEditComponent,
    ContactSiteComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        NgOptimizedImage,
    ],
  providers: [
    RestApiService,
    DataService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
