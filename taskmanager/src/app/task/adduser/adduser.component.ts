import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {Router} from '@angular/router';
import {TaskService} from '../task.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  user: User;
  users: User[];
  renderUpdateBtn : boolean;
  fname: string;
  lname: string;
  empId: number;
  userIdsearch: number;
  addClicked: boolean;
  
  constructor(private router: Router, private taskservice: TaskService) { }

  ngOnInit() {
    this.getAllUsers();
    this.user = new User();
    this.addClicked = false;
    /* this.fname = "";
    this.lname = "";
    this.empId = null; */
  }
  
  validaterequiredfields(form: NgForm) {
    const controls = form.controls;
    return  (!controls.firstName && !controls.lastName && !controls.employeeId) ||
            (!controls.firstName.value || !controls.lastName.value || !controls.employeeId.value);
  }

   addUser(form: NgForm): void {
     this.addClicked = true;
     if(form.valid) {
        this.taskservice.addUpdateUser(this.user).subscribe( data => { alert('User added successfully');
        this.getAllUsers();  
      });
     }
  }

  getAllUsers() {
    this.taskservice.getUsers()
      .subscribe( data => {this.users = data; });
  }

  reset(): void {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.employeeId = null;
    }

    editUser(user: User) {
      this.user = user;
      this.renderUpdateBtn = true;
    }
  
    updateUser(user: User): void {
      this.taskservice.addUpdateUser(this.user).subscribe( data => { alert('User Updated successfully');
    });
    }
  
    deleteUser(userId: number): void {
      this.taskservice.deleteUser(userId).subscribe(data => { alert('User Deleted successfully');
      this.getAllUsers();
    });
    }

    sortFirstName(){
      this.fname = "fname";
      this.lname = "";
      this.empId = null;
    }

    sortLastName(){
      this.fname = "";
      this.lname = "lname";
      this.empId = null;
    }

    sortEmployeeId(){
      this.fname = "";
      this.lname = "";
      this.empId = 0;
    }

}
