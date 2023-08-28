import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  REST_API_URL = 'http://localhost:3030/v1/api'
  REST_URL_TASK = 'http://localhost:3030/v1/api/task'
  REST_URL_EMPLOYEE = 'http://localhost:3030/v1/api/account'
  REST_URL_PROJECT = 'http://localhost:3030/v1/api/project'
  constructor(private http: HttpClient) {}

  getHeaders(){
    const token = localStorage.getItem('access_token');
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
  }
  get (link: string) {
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders)
      return this.http.get(link, {headers: headers}).toPromise()
    return this.http.get(link).toPromise()
  }
  getById (link: string, id: string) {
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders)
      return this.http.get(link + '/' + id, {headers: headers}).toPromise()
    return this.http.get(link + '/' + id).toPromise()
  }
  post(link: string, body: any) {
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders)
      return this.http.post(link, body, {headers: headers}).toPromise()
    return this.http.post(link, body).toPromise()
  }
  put (link: string, id: string, body: any) {
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders)
      return this.http.put(link + '/' + id, body, {headers: headers}).toPromise()
    return this.http.put(link + '/' + id, body).toPromise()
  }
  delete (link: string, id: string) {
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders)
      return this.http.delete(link + '/' + id, {headers: headers}).toPromise()
    return this.http.delete(link + '/' + id).toPromise()
  }
}
