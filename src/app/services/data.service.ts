import { Injectable } from '@angular/core';
import {Employee} from "../models/employee";
import {NavigationStart, Router} from "@angular/router";
import {RestApiService} from "./rest-api.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  message = ''
  messageType = 'danger'
  employee !: Employee | null
  constructor(private router: Router, private rest: RestApiService, private jwtHelper: JwtHelperService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.message = ''
    })
  }

  async getProfile() {
    let url = this.rest.REST_API_URL + '/account'
    try {
      let access_token = localStorage.getItem('access_token');
      if (access_token) {
        let token = this.jwtHelper.decodeToken(access_token)
        const data = await this.rest.getById(url, token.employeeId)
        this.employee = (data as {employee: Employee}).employee
      } else {
        this.employee = null
      }
    } catch (error) {
      this.error('Something went wrong loading, please try again!')
    }

  }

  error(message: string) {
    this.messageType = 'danger'
    this.message = message
    this.delay(5000).then(r => this.message = '')
  }

  success(message: string) {
    this.messageType = 'success'
    this.message = message
    this.delay(5000).then(r => this.message = '')
  }

  warning(message: string) {
    this.messageType = 'warning'
    this.message = message
    this.delay(5000).then(r => this.message = '')

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
