import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../Model/employee.model';
import { EmployeeService } from '../service/employee-service.service';
import { Department } from '../Model/department.model';
import { DataService } from '../service/data-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  editingMode = false;
  editedEmployeeId: number;
  departmentdetails: Department[];
  employee: Employee;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private data: DataService
  ) {}

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      employeeCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      active: ['', Validators.required],
      department: ['', Validators.required],
    });
    this.data.employeeMessage.subscribe((message) => {
      this.employee = message;
      if (this.employee?.id > 0) {
        this.editingMode = true;
        this.editEmployee(this.employee);
      }
    });
    this.getDepartment();
  }

  getDepartment() {
    this.employeeService.getDepartmentDetails().subscribe((data) => {
      this.departmentdetails = data;
    });
  }

  onSubmit() {
    const employeeData = this.employeeForm.value;
    this.editedEmployeeId = employeeData.id;

    if (this.editingMode) {
      this.employeeService
        .updateEmployee(this.editedEmployeeId, employeeData)
        .subscribe({
          complete: () => {
            this.clearForm();
          },
          error: (error) => {
            console.error(error);
          },
        });
    } else {
      this.employeeService.createEmployee(employeeData).subscribe({
        complete: () => {
          this.clearForm();
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  editEmployee(employee: Employee) {
    this.editedEmployeeId = employee.id;
    this.employeeForm.patchValue({
      employeeCode: employee.employeeCode,
      firstName: employee.firstName,
      lastName: employee.lastName,
      dateOfBirth: new Date(employee.dateOfBirth.toString()),
      gender: employee.gender,
      active: employee.active
    });
  }

  clearForm() {
    this.employeeForm.reset();
    this.editingMode = false;
    this.editedEmployeeId = 0;
  }
}
