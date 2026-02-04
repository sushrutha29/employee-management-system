package com.company.ems.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.company.ems.dto.SalaryRequest;
import com.company.ems.model.Employee;
import com.company.ems.model.Salary;
import com.company.ems.repository.EmployeeRepository;
import com.company.ems.repository.SalaryRepository;

@Service
public class SalaryService {

    private final SalaryRepository repo;
    private final EmployeeRepository employeeRepo;

    public SalaryService(SalaryRepository repo, EmployeeRepository employeeRepo) {
        this.repo = repo;
        this.employeeRepo = employeeRepo;
    }

    // Add salary for an employee
    public Salary addSalary(Long employeeId, SalaryRequest request) {
        // 1. Find employee
        Employee emp = employeeRepo.findById(employeeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        // 2. Resolve month
        String monthValue = resolveMonth(request.getMonth());

        // 3. Check if salary already exists for this employee & month
        if (repo.existsByEmployee_IdAndMonth(employeeId, monthValue)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Salary already exists for this month");
        }

        // 4. Create salary object
        Salary salary = new Salary();
        salary.setEmployee(emp);
        salary.setBasic(request.getBasic());
        salary.setAllowance(request.getAllowance());
        salary.setDeduction(request.getDeduction());
        salary.setMonth(monthValue);
        salary.setNetSalary(calculateNet(request.getBasic(), request.getAllowance(), request.getDeduction()));

        // 5. Save and return
        return repo.save(salary);
    }

    // Get all salaries for an employee
    public List<Salary> getByEmployee(Long employeeId) {
        return repo.findByEmployee_Id(employeeId);
    }

    // Delete a salary by ID
    public void deleteSalary(Long salaryId) {
        if (!repo.existsById(salaryId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Salary not found");
        }
        repo.deleteById(salaryId);
    }

    // Helper method: resolve month if null or blank
    private String resolveMonth(String month) {
        if (month != null && !month.isBlank()) {
            return month;
        }
        return LocalDate.now().format(DateTimeFormatter.ofPattern("MMMM yyyy"));
    }

    // Helper method: calculate net salary
    private Double calculateNet(Double basic, Double allowance, Double deduction) {
        double safeBasic = basic == null ? 0 : basic;
        double safeAllowance = allowance == null ? 0 : allowance;
        double safeDeduction = deduction == null ? 0 : deduction;
        return safeBasic + safeAllowance - safeDeduction;
    }
}
