import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Task} from "../../../models/task";
import {RestApiService} from "../../../services/rest-api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../../services/data.service";
import {Employee} from "../../../models/employee";

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
})
export class TaskAddComponent implements OnInit{
  saving = false;
  task = new Task
  employees!: Employee[];

  @Input("projectId")
  projectId!: string

  @Output()
  savingFinished: EventEmitter<string> = new EventEmitter<string>()
   constructor(private rest: RestApiService, private ngbModal: NgbModal,
                    private dataService: DataService) {
     this.task = new Task()
     this.task.status = "Prepare"

  }

  ngOnInit(): void {
    this.task.project_id = this.projectId
    console.log("project_id: ", this.task.project_id)
     this.rest.get(this.rest.REST_URL_EMPLOYEE).then(data => this.employees = (data as {employees: Employee[]}).employees)
  }

  openTask(content: TemplateRef<any>) {
    this.ngbModal.open(content, {ariaDescribedBy: 'modal-basic-title', centered: true, scrollable: true, size: 'lg'})
  }

  createTask(){
    this.saving = true
    this.rest.post(this.rest.REST_URL_TASK, this.task).then(async data => {
      this.savingFinished.emit('Create task successfully! this task is saved')
      this.saving = false
      await this.delay(500)
      this.ngbModal.dismissAll()
      this.task = new Task()
    }).catch(error => {
      this.saving = false
      this.dataService.error(error['message'])
    })
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
