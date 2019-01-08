import {Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task';
@Pipe({
  name: 'taskSearch'
})
export class TaskfilterPipe implements PipeTransform {
  transform(tasks: Task[], startDate: string, endDate: string, priority: number) {
    if (tasks && tasks.length) {
      if (startDate != "" && startDate == "startdatesort") {
        return tasks.sort((a, b) => a.startDate.localeCompare(b.startDate));
      }
      if (endDate != "" && endDate == "enddatesort") {
        return tasks.sort((a, b) => a.endDate.localeCompare(b.endDate));
      }
      if (priority != null) {
        return tasks.sort((a, b) => {
          if (a.priority > b.priority){
            return 1;
          }
          if (a.priority < b.priority){
            return -1;
          }
          return 0;
        });
      }
      else {
        return tasks;
      }
    }
  }
}
