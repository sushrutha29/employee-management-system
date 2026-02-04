package com.company.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.ems.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
