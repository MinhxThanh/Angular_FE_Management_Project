import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Task} from "../../../models/task";
import {Employee} from "../../../models/employee";
import {RestApiService} from "../../../services/rest-api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../../services/data.service";
import {Project} from "../../../models/project";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit{
  doingEdit = false;
  task = new Task
  employees!: Employee[];

  @Input("taskId")
  taskId!: string

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>()
  constructor(private rest: RestApiService, private ngbModal: NgbModal,
              private dataService: DataService) {
    this.task = new Task()
  }

  ngOnInit(): void {
    this.doingEdit = true
    this.rest.getById(this.rest.REST_URL_TASK, this.taskId).then(data => {
      this.task = (data as {data: Task}).data
      // parse endDate
      const create = new Date((data as {data: Task}).data.created_at);
      const due = new Date((data as {data: Task}).data.due_date);
      this.task.created_at = create.toISOString().slice(0,10);
      this.task.due_date = due.toISOString().slice(0, 10)
      this.doingEdit = false
    })
  }

  openTask(content: TemplateRef<any>) {
    this.ngbModal.open(content, {ariaDescribedBy: 'modal-basic-title', centered: true, scrollable: true, size: 'lg'})
  }

  updateTask(){
    this.doingEdit = true
    this.rest.put(this.rest.REST_URL_TASK, this.taskId,this.task).then(async data => {
      this.updateFinished.emit('Edit task successfully!')
      this.doingEdit = false
      await this.delay(500)
      this.ngbModal.dismissAll()
      this.task = new Task()
    }).catch(error => {
      this.doingEdit = false
      this.dataService.error(error['message'])
    })
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
