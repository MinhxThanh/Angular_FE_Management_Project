import { Component } from '@angular/core';
import {Employee} from "../../models/employee";
import {RestApiService} from "../../services/rest-api.service";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  employee: Employee
  btnDisabled = false
  url = this.rest.REST_API_URL + '/authentication/login'
  constructor(private rest: RestApiService, private data: DataService, private router: Router) {
    this.employee = new Employee();
  }
  ngOnInit(): void {
  }

  validate() {
    return true;
  }

  async login() {
    this.btnDisabled = true
    if (this.validate()){
      this.rest.post(this.url, this.employee).then(async data => {
        let value = data as { employeeId: string, token: string }
        localStorage.setItem('access_token', value.token)
        await this.data.getProfile()
        this.router.navigate(['/'])
      }).catch(error => {
        this.data.error(error['message'])
        this.btnDisabled = false
        console.log('Error here: ', this.employee)
      })
    }
  }
}
