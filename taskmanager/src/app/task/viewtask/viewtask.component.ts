import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'; 
import { ParentTask } from '../parentTask';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  tasks: Task[];
  rendertask: boolean;
  editingTask: Task;
  tasknameSearch: string;
  parenttaskSearch: string;
  priorityfromSearch: number;
  prioritytoSearch: number;
  startdateSearch: string;
  enddateSearch: string;
  task: Task;
  selectedtasks: Task[];
  selected: any;
  parentTasks: ParentTask[];
  parentTask: ParentTask;
  startdatesort: string;
  enddatesort: string;
  prioritysort: number;
  
  constructor(private router: Router, private taskservice: TaskService, private modalService: NgbModal) { }

  ngOnInit() {
    this.task = new Task;
  }

  editTask(task: Task) {
    this.rendertask = true;
    this.editingTask = task;
  }

  updateTask(task: Task): void {
    this.taskservice.updateTask(task).subscribe( data => { alert('Task Updated successfully');
  });
  }

  cancelTask() {
    this.rendertask = false;
  }

  endTask(task: Task): void {
    task.endTask = 'yes';
    this.taskservice.updateTask(task).subscribe(data => { alert('Task Ended successfully');
  });
  }

  open(content) {
    console.log("user list in modal" + this.tasks);
    this.taskservice.getTasks()
      .subscribe( data => {
        console.log("printing data"+ JSON.stringify(data));
        this.selectedtasks = data;
      });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
    });
  }

  selecttask(projectId: any) {
    let obj = this.selectedtasks.filter(m => m.projectId ==projectId);
    this.tasks = obj;
  }

  opentask(content) {
    this.parentTask = new ParentTask;
    this.getParentTasks();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.editingTask.parentTaskName = this.parentTask.parentTaskName;
      this.editingTask.parentTaskId = this.parentTask.parentTaskId;
    });
  }

  getParentTasks() {
    this.taskservice.getParentTasks().subscribe( data => {this.parentTasks = data; });
  }

  sortStartDate(){
    this.startdatesort = "startdatesort";
    this.enddatesort = "";
    this.prioritysort = null;
  }

  sortEndDate(){
    this.startdatesort = "";
    this.enddatesort = "enddatesort";
    this.prioritysort = null;
  }

  sortPriority(){
    this.startdatesort = "";
    this.enddatesort = "";
    this.prioritysort = 0;
  } 

}
