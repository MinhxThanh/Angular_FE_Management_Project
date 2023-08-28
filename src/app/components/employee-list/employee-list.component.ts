import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../../services/rest-api.service";
import {DataService} from "../../services/data.service";
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{
  employees!: Employee[]
  btnDisabled: boolean = false;
  url = this.rest.REST_API_URL + '/account'
  constructor(private rest: RestApiService, private data: DataService){}

  ngOnInit(): void {
    this.btnDisabled = true
    this.rest.get(this.url).then(data => {
      this.employees = (data as {employees: Employee[]}).employees
      this.btnDisabled = false
    }).catch(error => {
      this.btnDisabled =false
      this.data.error(error['message'])
    })
  }

  deleteEmployee(employeeId: string) {
    this.btnDisabled = true
    this.rest.delete(this.url, employeeId).then(data => {
      this.data.success((data as {message: string}).message)
      this.btnDisabled = false
      this.ngOnInit()
    }).catch(error => {
      this.data.error(error['message'])
      this.btnDisabled = false
    })
  }

}
