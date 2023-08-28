import { Component } from '@angular/core';
import {DataService} from "./services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project-FE';

  constructor(public dataService: DataService, private router: Router) {
    this.dataService.getProfile()
  }
  signOut(){
    this.dataService.employee = null;
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
