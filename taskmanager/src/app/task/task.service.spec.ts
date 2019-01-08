import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Task} from'./task';

let httptest: HttpTestingController;

describe('TaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('EndTask should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
    service.endTask({taskId: 8,
      taskName: 'e2etest',
      parentTaskName: 'e2e',
      priority: 5,
      startDate: '11-05-2018',
      endDate: '11-05-2018',
      }).subscribe(res => {
      expect(res).toEqual('Active');
    })
    const req = httptest.expectOne('http://localhost:8442/tasks');
    expect(req.request.method).toBe('PUT');
    httptest.verify();
  });

  it('getTaskList should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    service.getTasks().subscribe(res => {
      expect(res.length).toEqual(7);
    })
    const req = httptest.expectOne('http://localhost:8442/tasks');
    expect(req.request.method).toBe('GET');
    httptest.verify();
  });

  it('EndTask should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    const taskid: number = 7;
    expect(service).toBeTruthy();
    service.endTask(taskid).subscribe(res => {
      expect(res).toEqual('InActive');
    })
    const req = httptest.expectOne('http://localhost:8442/tasks?${taskid}');
    expect(req.request.method).toBe('PUT');
    httptest.verify();
  });

});
