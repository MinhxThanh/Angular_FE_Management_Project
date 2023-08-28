# ProjectFE

The system is a front end application built with Angular that allows employees to manage projects and tasks. The main features include:

User management - The ability for administrators to add, edit and delete employee user accounts. Employees can log in to access the system.
Project management - Employees can create new projects, add details like name, description, start and end dates. They can also edit and delete projects.
Task management - Within each project, employees can create, edit and delete tasks. Tasks have names, descriptions, due dates, assignees and status.
Dashboard views - The dashboard provides overview of all projects and tasks. Employees can filter and sort projects and tasks, and mark tasks as complete.
Notifications - Employees get notifications when projects and tasks are nearing completion or overdue.
Reporting - Managers can generate reports on projects, tasks and employee workload.
The front end uses Angular framework and components for the UI. It calls APIs hosted on Node.js and Express on the back end for data storage and retrieval from a MongoDB database.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
