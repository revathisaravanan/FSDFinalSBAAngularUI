import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { Project } from '../project';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'; 
import { User } from '../user';
import { ParentTask } from '../parentTask';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  task: Task = new Task();
  projects: Project[];
  selected = null;
  users: User[];
  checkboxDisabled : boolean;
  parentTasks: ParentTask[];
  parentTask: ParentTask;
  project: Project;
  user: User;
  addClicked: boolean;

  constructor(private router: Router, private taskservice: TaskService, private modalService: NgbModal,) { }

  ngOnInit() {
    this.setDefaultStartEndDate();
    this.checkboxDisabled = false;
    this.addClicked = false;
  }

  validaterequiredfields(form: NgForm) {
    const controls = form.controls;
    return  !controls.taskName || !controls.taskName.value;
  }

  addTask(form: NgForm): void {
    this.addClicked = true;
    if(form.valid) {
    console.log("Task Details.."+JSON.stringify(this.task))
    this.taskservice.addTask(this.task).subscribe( data => { alert('Task added successfully');
    });
   }
  }

  reset(): void {
    this.task.taskName = '';
    this.task.parentTaskName = '';
    this.task.priority = null;
    this.task.startDate = '';
    this.task.endDate = '';
    this.task.projectName = '';
    this.task.managerName = '';
  }

  getAllProjects() {
    this.taskservice.getProjects().subscribe( data => {this.projects = data; });
  }

  getParentTasks() {
    this.taskservice.getParentTasks().subscribe( data => {this.parentTasks = data; });
  }

  getAllUsers() {
    this.taskservice.getUsers()
      .subscribe( data => {this.users = data; });
  }

  open(content) {
    console.log("project list in modal" + this.projects);
    this.project = new Project;
    this.getAllProjects();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.task.projectName = this.project.projectName;
      this.task.projectId = this.project.projectId;
    });
  }

  openuser(content) {
    console.log("user list in modal" + this.users);
    this.user = new User;
    this.getAllUsers();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.task.managerId = this.user.userId;
      this.task.managerName = this.user.firstName + this.user.lastName;
    });
  }

  opentask(content) {
    console.log("task list in modal" + this.parentTasks);
    this.parentTask = new ParentTask;
    this.getParentTasks();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.task.parentTaskName = this.parentTask.parentTaskName;
      this.task.parentTaskId = this.parentTask.parentTaskId;
    });
  }

  checkBoxChange(event){
    if(event.target.checked) {
      this.checkboxDisabled = true;
      console.log("check box console"+event.target.checked);
      this.setDefaultStartEndDate();
    }
   }

  setDefaultStartEndDate() {
    this.task.startDate = new Date().toISOString().split('T')[0];
      this.task.endDate =  new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
  }

}
