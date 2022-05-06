package com.infy.associateApp.employee.service;

import com.infy.associateApp.employee.model.Employee;
import com.infy.associateApp.employee.repo.EmployeeRepository;
import com.infy.associateApp.pod.logging.exception.EmployeeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    public Employee saveEmployee(Employee employee) throws EmployeeException {
        try {
            return repository.save(employee);
        } catch (Exception e) {
            throw new EmployeeException("EMPLOYEE_SERVICE.INVALID_DATA");
        }
    }
    public Employee getEmployeeByEmpId(int empId) throws EmployeeException {
        try {
            return repository.getByEmpId(empId);
        } catch (Exception e) {
            throw new EmployeeException("EMPLOYEE_SERVICE.INVALID_EMPLOYEE_ID");
        }
    }
    // Calls repo function to get employee role: David
    public String getEmployeeRole(int empId) throws EmployeeException {
        try {
            Employee employee = repository.getByEmpId(empId);
            return employee.getRole();
        } catch (Exception e) {
            throw new EmployeeException("EMPLOYEE_SERVICE.INVALID_EMPLOYEE_ID");
        }
    }
    // Calls repo function to save updated employee: David/Medhane
    public void updateEmployee(Employee emp, int empId) throws EmployeeException {
        if (empId == emp.getEmpId()) {
            try {
                Employee existingEmployee = repository.getByEmpId(empId);
                existingEmployee.setName(emp.getName());
                existingEmployee.setInfosysEmailId(emp.getInfosysEmailId());
                existingEmployee.setPhoneNumber(emp.getPhoneNumber());
                existingEmployee.setCurrentLocation(emp.getCurrentLocation());

                repository.save(existingEmployee);
            } catch (Exception e) {
                throw new EmployeeException("Invalid Data");
            }
        } else {
            throw new EmployeeException("EMPLOYEE_SERVICE.ACCESS_DENIED");
        }

      }
      //pagination
    public Page<Employee>findEmployeeWithPagination(int offset,int pageSize){
        Page<Employee> employees=repository.findAll(PageRequest.of(offset, pageSize));
        return employees;

    }
    public List<Employee> findEmployeeWithSorting(String field)
    {
        return repository.findAll(Sort.by(Sort.Direction.ASC,field));
    }
}
