import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Project} from "../../models/project";
import {RestApiService} from "../../services/rest-api.service";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Task} from "../../models/task";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit{
  @ViewChild('projectUpdateForm')
  projectUpdateForm!: NgForm
  project!: Project
  btnDisabled = false
  tasks!: Task[]
  id: string
  deleteTaskId!: string
  confirmMessage = ''

  constructor(private rest: RestApiService, private dataService: DataService,
              private activateRoute: ActivatedRoute, private router: Router,
              private ngbModal: NgbModal) {
    this.id = activateRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.rest.getById(this.rest.REST_URL_PROJECT, this.id).then(data => {
      // get project data first
      this.project = (data as {data: Project}).data;
      // parse endDate
      const end = new Date((data as {data: Project}).data.endDate);
      const start = new Date((data as {data: Project}).data.startDate);
      this.project.endDate = end.toISOString().slice(0,10);
      this.project.startDate = start.toISOString().slice(0, 10)
      this.btnDisabled = false;
      this.rest.getById(this.rest.REST_URL_TASK + '/by-project-id', this.project._id).then(data => {
        this.tasks = (data as {data: Task[]}).data
      }).catch(error => console.error(error));
    })
  }

  validate() {
    return this.projectUpdateForm.valid
  }

  update() {
    this.btnDisabled = true
    if (this.validate()) {
      this.rest.put(this.rest.REST_URL_PROJECT, this.id, this.project).then(async data => {
        this.dataService.warning("Project is updated!")
        this.btnDisabled = false
        await this.delay(500)
        this.router.navigate(['/project-list']).then()
      }).catch(error => {
        this.dataService.error(error['message'])
        this.btnDisabled = false
      })
    }
  }

  confirmDeleteTasks(confirmDialog: TemplateRef<any>, id: string, name: string) {
    this.confirmMessage = `Do you want to delete this task named ${name}?`
    this.deleteTaskId = id
    this.ngbModal.open(confirmDialog, {ariaDescribedBy: 'modal-basic-title'}).result.then(result => {
      this.deleteTaskId = ''
    }, error => this.dataService.error(error['message']))
  }

  deleteTask(){
    if (this.deleteTaskId !== '')
      this.rest.delete(this.rest.REST_URL_TASK, this.deleteTaskId).then(res => {
        this.ngbModal.dismissAll()
        this.ngOnInit()
        this.dataService.message = 'Delete task successfully!'
      }).catch(err =>this.dataService.error(err['message']))
  }

  finishedAndAlert(message: string) {
    this.dataService.success(message)
    this.ngOnInit()
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
