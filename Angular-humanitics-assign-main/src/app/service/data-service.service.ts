import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../Model/employee.model';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<Employee>(new Employee());
  employeeMessage = this.messageSource.asObservable();

  constructor() { }

  editEmployee(employee: Employee) {
    this.messageSource.next(employee)
  }

}