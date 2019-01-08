import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Task } from './task';
import {User} from './user';
import {Project} from './project';
import { ParentTask } from './parentTask';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':  'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8442/tasks';
  private apiUserUrl = 'http://localhost:8442/users';
  private apiBaseUserUrl = 'http://localhost:8442/projects';
  
  constructor(private http: HttpClient) { }

  addTask(task: Task) {
    console.log("data"+JSON.stringify(task));
    return this.http.post(this.apiUrl, JSON.stringify(task), httpOptions);
  }

  getTasks() {
    return this.http.get<Task[]>(this.apiUrl + '/tasklist');
  }

  updateTask(task: Task) {
    return this.http.put(this.apiUrl, JSON.stringify(task), httpOptions);
  }

  endTask(task) {
    return this.http.delete(this.apiUrl + '/' + task.id);
  }

  getParentTasks() {
    return this.http.get<ParentTask[]>(this.apiUrl + '/parentTask');
  }

  addUpdateUser(user: User) {
    return this.http.post(this.apiUserUrl, JSON.stringify(user), httpOptions);
  }

  getUsers() {
    return this.http.get<User[]>(this.apiUserUrl);
  }

  deleteUser(userId) {
    console.log("UserID"+userId);
    return this.http.delete(this.apiUserUrl + '/' + userId);
  }

  updateUser(user: User) {
    return this.http.put(this.apiUserUrl, JSON.stringify(user), httpOptions);
  }

  addUpdateProject(project: Project) {
    return this.http.post(this.apiBaseUserUrl, JSON.stringify(project), httpOptions);
  }

  updateProject(project: Project) {
    return this.http.put(this.apiBaseUserUrl, JSON.stringify(project), httpOptions);
  }

  getProjects() {
    return this.http.get<Project[]>(this.apiBaseUserUrl);
  }
}