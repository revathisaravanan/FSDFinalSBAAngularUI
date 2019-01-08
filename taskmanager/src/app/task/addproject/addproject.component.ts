import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'; 
import {TaskService} from '../task.service';
import {User} from '../user';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  users: User[];
  project: Project = new Project();
  selected = null;
  checkboxDisabled : boolean;
  renderUpdateBtn : boolean;
  user: User;
  projects: Project[];
  projectsearch: string;
  startdatesort: string;
  enddatesort: string;
  prioritysort: number;
  statusort: number;
  addClicked: boolean;

  constructor(private modalService: NgbModal, private taskservice: TaskService) { }

  ngOnInit() {
    this.getAllUsers();
    this.getAllProjects();
    this.checkboxDisabled = false;
    this.renderUpdateBtn = false;
    this.project.priority = 0;
    this.addClicked = false;
  }

  validaterequiredfields(form: NgForm) {
    const controls = form.controls;
    return  !controls.projectName || !controls.projectName.value;
  }

  addProject(form: NgForm) {
    this.addClicked = true;
    if(form.valid) {
      this.taskservice.addUpdateProject(this.project).subscribe( data => { alert('Project added successfully');
      this.getAllProjects();
    });
    }
 }

  editProject(project: Project) {
    this.project = project;
    this.renderUpdateBtn = true;
    this.checkboxDisabled = true;
  }

  updateProject(project: Project): void {
    this.taskservice.addUpdateProject(project).subscribe( data => { alert('Project Updated successfully');
    });
  }

  suspendProject(project: Project): void {
    project.endProject = 'yes';
    this.taskservice.updateProject(project).subscribe(data => { alert('Project Suspended successfully');
    });
  }

  getAllUsers() {
    this.taskservice.getUsers()
      .subscribe( data => {this.users = data; 
      });
  }

  getAllProjects() {
    this.taskservice.getProjects().subscribe( data => {this.projects = data; 
    });
  }

  checkBoxChange(event){
    if(event.target.checked) {
      console.log("check box console"+event.target.checked);
      this.project.startDate = new Date().toISOString().split('T')[0];
      this.project.endDate =  new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
    }
    else {
      this.project.startDate = "";
      this.project.endDate =  "";
    }
  }

  open(content) {
    console.log("user list in modal" + this.users);
    this.user = new User;
    //this.selected = null;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.project.managerName = this.user.firstName + this.user.lastName;
      this.project.managerId = this.user.userId;
    });
  }

  sortStartDate(){
    this.startdatesort = "startdatesort";
    this.enddatesort = "";
    this.prioritysort = null;
    this.statusort = null;
  }

  sortEndDate(){
    this.startdatesort = "";
    this.enddatesort = "enddatesort";
    this.prioritysort = null;
    this.statusort = null;
  }

  sortPriority(){
    this.startdatesort = "";
    this.enddatesort = "";
    this.prioritysort = 0;
    this.statusort = null;
  } 

  sortCompleted(){
    this.startdatesort = "";
    this.enddatesort = "";
    this.prioritysort = null;
    this.statusort = 0;
  }

  reset(): void {
    this.project.projectName = '';
    this.project.startDate = '';
    this.project.endDate = '';
    this.project.priority = null;
    this.project.managerName = '';
    }
}
