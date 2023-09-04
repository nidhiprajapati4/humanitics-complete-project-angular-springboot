import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from '../Model/employee.model';
import { EmployeeService } from '../service/employee-service.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { DataService } from '../service/data-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  @Output() editEmployeeDetails = new EventEmitter<Employee>();

  employees: Employee[];
  constructor(
    private employeeService: EmployeeService,
    private dataservice: DataService
  ) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      complete: () => {
        this.fetchEmployees();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  editEmployee(employee: Employee) {
    this.dataservice.editEmployee(employee);
  }
}
