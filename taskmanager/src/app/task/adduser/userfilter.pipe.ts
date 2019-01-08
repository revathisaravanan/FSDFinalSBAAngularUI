import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../user';
@Pipe({
  name: 'userSearch'
})
export class UserfilterPipe implements PipeTransform {

  transform(users: User[], userIdsearch: number, fname: string, lname: string, empid: number) {
    if (users && users.length) {
      if (userIdsearch != null && users && users.length > 0) {
        return users.filter(user => {
          if (userIdsearch && user.employeeId.toString().indexOf(userIdsearch.toString()) === -1) {
            return false;
          }
          return true;
        });
      }
      if (fname != "" && fname == "fname") {
        return users.sort((a, b) => a.firstName.localeCompare(b.firstName));
      }
      if (lname != "" && lname == "lname") {
        return users.sort((a, b) => a.lastName.localeCompare(b.lastName));
      }
      if (empid != null) {
        return users.sort((a, b) => {
          if (a.employeeId > b.employeeId){
            return 1;
          }
          if (a.employeeId < b.employeeId){
            return -1;
          }
          return 0;
        });
      }
      else {
        return users;
      }

    }
  }
}
