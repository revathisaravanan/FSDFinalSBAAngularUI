import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { TaskRoutingModule } from './task-routing.module';
import {TaskfilterPipe} from './viewtask/taskfilter.pipe';
import { AdduserComponent } from './adduser/adduser.component';
import {UserfilterPipe} from './adduser/userfilter.pipe';
import { AddprojectComponent } from './addproject/addproject.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProjectfilterPipe} from './addproject/projectfilter.pipe';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    NgbModule
  ],
  declarations: [AddtaskComponent, ViewtaskComponent, TaskfilterPipe, AdduserComponent, UserfilterPipe, AddprojectComponent, ProjectfilterPipe]
})
export class TaskModule { }
