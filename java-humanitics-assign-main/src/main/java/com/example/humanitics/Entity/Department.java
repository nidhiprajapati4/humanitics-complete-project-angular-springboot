package com.example.humanitics.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "department_details")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long departmentid;
    private String departmentName;
    private boolean active;
    private Date createdAt;
    private Date updatedAt;

}
