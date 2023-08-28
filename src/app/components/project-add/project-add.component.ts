import {Component, ViewChild} from '@angular/core';
import {Project} from "../../models/project";
import {RestApiService} from "../../services/rest-api.service";
import {DataService} from "../../services/data.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent {
  @ViewChild('projectForm')
  projectForm!: NgForm
  project: Project
  btnDisabled = false
  url = this.rest.REST_API_URL + '/project'

  constructor(private rest: RestApiService, private dataService: DataService, private router: Router) {
    this.project = new Project();
  }

  validate() {
    return this.projectForm.valid;
  }

  save() {
    this.btnDisabled = true
    if (this.validate()) {
      this.rest.post(this.url, this.project).then(async data => {
        this.dataService.success("Project is created!")
        this.btnDisabled = false
        await this.delay(500)
        this.router.navigate(['/project-list']).then()
      }).catch(error => {
        this.dataService.error(error['message'])
        this.btnDisabled = false
      })
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
