import {Component, OnInit} from '@angular/core';
import {Employee} from "../../models/employee";
import {RestApiService} from "../../services/rest-api.service";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit{
  employee!: Employee
  btnDisabled = false
  url = this.rest.REST_API_URL + '/account'
  id: string

  constructor(private rest: RestApiService, private data: DataService,
              private route: ActivatedRoute, private router: Router) {
    this.id = route.snapshot.params['id']
  }
  ngOnInit(): void {
    this.btnDisabled = true
    this.rest.getById(this.url, this.id).then(data => {
      console.log("Info: ", data)
      this.employee = (data as {employee: Employee}).employee
      this.btnDisabled = false

    }).catch(error => {
      this.data.error(error['message'])
      this.btnDisabled = false
    })
  }

  validate() {
    return true;
  }

  update() {
    this.btnDisabled = true
    if (this.validate()){
      this.rest.put(this.url, this.id, this.employee).then(data => {
        this.data.success('Employee is updated!')
        this.btnDisabled = false
        this.router.navigate(['/employee-list']).then()
      }).catch(error => {
        this.data.error(error['message'])
        this.btnDisabled = false
        console.log('Error here: ', this.employee)
      })
    }
  }
}
