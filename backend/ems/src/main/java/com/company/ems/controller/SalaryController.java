package com.company.ems.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.company.ems.dto.SalaryRequest;
import com.company.ems.model.Salary;
import com.company.ems.service.SalaryService;


@RestController
@RequestMapping("/api/salary")
@CrossOrigin
public class SalaryController { 
    private final SalaryService service;

    public SalaryController(SalaryService service) {
        this.service = service;
    }

    @PostMapping("/{employeeId}")
    public Salary addSalary(@PathVariable Long employeeId, @RequestBody SalaryRequest request) {
        return service.addSalary(employeeId, request);
    }
    @GetMapping("/{employeeId}")
    public List<Salary> getByEmployee(@PathVariable Long employeeId) {
        return service.getByEmployee(employeeId);
    }

    @DeleteMapping("/{salaryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSalary(@PathVariable Long salaryId) {
        service.deleteSalary(salaryId);
    }

}