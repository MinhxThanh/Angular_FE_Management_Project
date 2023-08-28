import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../../services/rest-api.service";
import {DataService} from "../../services/data.service";
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  employee: Employee
  btnDisabled = false
  url = this.rest.REST_API_URL + '/account'
  constructor(private rest: RestApiService, private data: DataService) {
    this.employee = new Employee();
  }
  ngOnInit(): void {
  }

  validate() {
    return true;
  }

  save() {
    this.btnDisabled = true
    if (this.validate()){
      this.rest.post(this.url, this.employee).then(data => {
        this.data.success('Employee is saved!')
        this.btnDisabled = false
      }).catch(error => {
        this.data.error(error['message'])
        this.btnDisabled = false
        console.log('Error here: ', this.employee)
      })
    }
  }
}
