import {Component, OnInit, TemplateRef} from '@angular/core';
import {Project} from "../../models/project";
import {RestApiService} from "../../services/rest-api.service";
import {DataService} from "../../services/data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit{
  projects!: Project[]
  btnDisabled: boolean = false
  url = this.rest.REST_API_URL + '/project'
  deleteId!: string
  confirmMessage = ''
  constructor(private rest: RestApiService, private dataService: DataService,
              private ngbModal: NgbModal) {}

  ngOnInit(): void {
    this.btnDisabled = true
    this.rest.get(this.url).then(data => {
      this.projects = (data as {data: Project[]}).data
      this.btnDisabled = false
    }).catch(error => {
      this.btnDisabled = false
      this.dataService.error(error['message'])
    })
  }

  confirmDeleteProject(confirmDialog: TemplateRef<any>, id: string, name: string) {
    this.confirmMessage = `Do you want to delete this project named '${name}'?`
    this.deleteId = id;
    this.ngbModal.open(confirmDialog, {ariaDescribedBy: 'modal-basic-title'}).result.then((result) => {
      this.deleteId = ''
    }, error => {
      this.dataService.error = error
    })
  }

  deleteProject() {
    if (this.deleteId !== '') {
      this.rest.delete(this.url, this.deleteId).then(data => {
        this.ngbModal.dismissAll();
        this.ngOnInit()
        this.dataService.message = 'Delete project successfully!'
      }).catch(error => this.dataService.error(error['message']))
    }
  }

}
