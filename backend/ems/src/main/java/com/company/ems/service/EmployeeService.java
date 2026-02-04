package com.company.ems.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.company.ems.model.Employee;
import com.company.ems.repository.EmployeeRepository;

@Service
public class EmployeeService {
    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    public Employee save(Employee employee) {
        return repo.save(employee);
    }

    public List<Employee> getAll() {
        return repo.findAll();
    }

    public Employee update(Long id, Employee updatedEmployee) {
        return repo.findById(id).map(emp -> {
            emp.setName(updatedEmployee.getName());
            emp.setEmployeeId(updatedEmployee.getEmployeeId());
            emp.setEmail(updatedEmployee.getEmail());
            emp.setDepartment(updatedEmployee.getDepartment());
            emp.setStatus(updatedEmployee.getStatus());
            emp.setRole(updatedEmployee.getRole());
            return repo.save(emp);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        }
        repo.deleteById(id);
    }
}
