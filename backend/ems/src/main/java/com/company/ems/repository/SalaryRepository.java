package com.company.ems.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.ems.model.Salary;

public interface SalaryRepository extends JpaRepository<Salary, Long> {
    List<Salary> findByEmployee_Id(Long employeeId);
}
