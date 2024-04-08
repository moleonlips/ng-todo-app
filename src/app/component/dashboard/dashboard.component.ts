import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/services/crud.service';
import * as taskData from '../../../assets/db.json'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jsonTask: any = taskData

  taskObj: Task = new Task()

  taskArr: Task[] = []

  addTaskValue: string = ''

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.taskArr = this.jsonTask.tasks;
    console.log('>>> check data: ', this.taskArr);
    // this.crudService.getAllTasks().subscribe(res => {
    //   this.taskArr = res;
    // }, err => {
    //   alert("Unable to get list of tasks: " + err)
    // })
  }

  addTask() {
    this.taskObj.taskName = this.addTaskValue
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert(err)
    })
  }

  editTask() {
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit()
    }, err => {
      alert("Failed to update task!" + err)
    })
  }

  deleteTask(eTask: Task) {
    this.crudService.deleteTask(eTask).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Failed to delete task" + err)
    })
  }

  check() {
    alert(this.addTaskValue)
  }
}
