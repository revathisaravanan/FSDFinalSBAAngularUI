import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../project';
@Pipe({
  name: 'projectFilter'
})
export class ProjectfilterPipe implements PipeTransform {

  transform(projects: Project[], projectsearch: string, startDate: string, endDate: string, priority: number, status: number) {
    if (projects && projects.length) {
      if (projectsearch != null && projects && projects.length > 0) {
        return projects.filter(project => {
          if (projectsearch && project.projectName.indexOf(projectsearch) === -1) {
            return false;
          }
          return true;
        });
      }
     if (startDate != "" && startDate == "startdatesort") {
        return projects.sort((a, b) => a.startDate.localeCompare(b.startDate));
      }
      if (endDate != "" && endDate == "enddatesort") {
        return projects.sort((a, b) => a.endDate.localeCompare(b.endDate));
      }
      if (priority != null) {
        return projects.sort((a, b) => {
          if (a.priority > b.priority){
            return 1;
          }
          if (a.priority < b.priority){
            return -1;
          }
          return 0;
        });
      }
      if (status != null) {
        return projects.sort((a, b) => {
          if (a.noOfCompletedTask > b.noOfCompletedTask){
            return 1;
          }
          if (a.noOfCompletedTask < b.noOfCompletedTask){
            return -1;
          }
          return 0;
        });
      }
      else {
        return projects;
      }
      }
  }
}
