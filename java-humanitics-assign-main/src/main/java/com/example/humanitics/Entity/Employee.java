package com.example.humanitics.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "core_employee")
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "employee_id", nullable = false)
	private Long id;
	private String employeeCode;
	private String firstName;
	private String lastName;
	private Date dateOfBirth;
	private String gender;
	private boolean active;
	private Date created_at;
	private Date updated_at;
	private int departmentId;

}
