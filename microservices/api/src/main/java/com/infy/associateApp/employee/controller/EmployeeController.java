package com.infy.associateApp.employee.controller;

import com.infy.associateApp.employee.model.Employee;
import com.infy.associateApp.employee.repo.EmployeeRepository;
import com.infy.associateApp.employee.service.AdminService;
import com.infy.associateApp.employee.service.EmployeeService;
import com.infy.associateApp.pod.logging.exception.EmployeeException;
import com.infy.associateApp.trainingCert.domain.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

	@Autowired
	private EmployeeService service;

	// Get request to find employee role: David (Passed PM)
	@PostMapping("/employees/login")
	public Employee login(@RequestBody int empId) throws EmployeeException {
		return service.getEmployeeByEmpId(empId);
	}

	// Put request to update employee: David (Passed PostMan)
	@PutMapping("/employees/{empId}")
	public ResponseEntity<String> updateEmployee(@RequestBody Employee emp, @PathVariable int empId)
			throws EmployeeException {
		service.updateEmployee(emp, empId);
		String success = "Employee: " + emp.getName() + " successfully updated";
		return new ResponseEntity<>(success, HttpStatus.OK);
	}

	// Admin specific routes: David
	@Autowired
	private AdminService adminService;
	@Autowired
	private EmployeeRepository employeeRepository;

	// Post request to create complete new employee in DB: David (Passed PM)
	@PostMapping("employees")
	public ResponseEntity<String> createEmployee(@Valid @RequestBody Employee emp) throws EmployeeException {
		if (employeeRepository.existsByEmpId(emp.getEmpId())) {
			return new ResponseEntity<>("Employee ID already exists", HttpStatus.OK);
		}
		if (employeeRepository.existsByInfosysEmailId(emp.getInfosysEmailId())) {
			return new ResponseEntity<>("Email already exists", HttpStatus.OK);
		}
		String password = adminService.createEmployee(emp);
		String success = "Employee: " + emp.getEmpId() + " Initial Password: " + password;
		return new ResponseEntity<>(success, HttpStatus.OK);
	}

	// (Passed PM)
	@GetMapping("/employees")
	public List<Employee> findAllEmployee() throws EmployeeException {
		return adminService.getEmployees();
	}

	// get request to find employee by ID: David (Passed PM)
	@GetMapping("/employees/{empId}/empId")
	public Employee getEmployeeById(@PathVariable int empId) throws EmployeeException {
		return adminService.getEmployeeById(empId);
	}

	// find employees by Partial name: Medhane (passes test on PostMan)
	@GetMapping("/employees/{name}/name")
	public List<Employee> findPartialEmployeeByName(@PathVariable String name) {
		return adminService.findEmployeeByName(name);
	}

	// get employees by empId return List : Medhane (passes test on PostMan)
	@GetMapping("/employees/employeeId/{empId}")
	public List<Employee> getByEmployeeId(@PathVariable int empId) {
		System.out.println("empID----------------------------------");
		return adminService.getByEmployeeId(empId);
	}

	// find employee by phone number: Medhane (passes test on PostMan)
	@GetMapping("/employees/PhoneNumber/{number}")
	public Employee findEmployeeByPhoneNumber(@PathVariable String number) {
		return adminService.findEmployeeByPhoneNumber(number);
	}

	// Get request to find employee by email: David (Passed PM)
	@GetMapping("/employees/{infosysEmailId}/email")
	public Employee findEmployeeByEmail(@PathVariable String infosysEmailId) throws EmployeeException {
		return adminService.getEmployeeByEmail(infosysEmailId);
	}

	// updates existing employee: David (Passed PM)
	@PutMapping("employees/{empId}/admin")
	public ResponseEntity<String> updateEmployeeAdmin(@RequestBody Employee empData, @PathVariable int empId)
			throws EmployeeException {
		Employee emp = employeeRepository.getByEmpId(empData.getEmpId());
		if (!(emp.getInfosysEmailId().equals(empData.getInfosysEmailId()))) {
			if (employeeRepository.existsByInfosysEmailId(empData.getInfosysEmailId())) {
				return new ResponseEntity<>("Email already exists", HttpStatus.OK);
			}
		}
		String success = "Employee: " + empData.getName() + " successfully updated";
		adminService.updateEmployee(empData, empId);
		return new ResponseEntity<>(success, HttpStatus.OK);
	}

	// Toggles status ACTIVE/INACTIVE: David (Passed)
	@PutMapping("employees/status")
	public ResponseEntity<String> toggleEmployeeStatus(@RequestBody Employee empData) throws EmployeeException {
		int empId = empData.getEmpId();
		String status = empData.getStatus().toUpperCase();
		String statusReason = empData.getStatusReason();

		if (status.equalsIgnoreCase("ACTIVE")) {
			adminService.addEmployee(empId, statusReason);
			String success = "Employee: " + empId + " is now active";
			return new ResponseEntity<>(success, HttpStatus.OK);
		} else {
			adminService.removeEmployee(empId, statusReason);
			String success = "Employee: " + empId + " successfully set to inactive";
			return new ResponseEntity<>(success, HttpStatus.OK);
		}
	}

	// Deletes Employee from DB: David (Passed PM)
	@DeleteMapping("employees")
	public ResponseEntity<String> deleteEmployeeByAdmin() throws EmployeeException {
		adminService.deleteAllEmployees();
		String success = "Employees successfully deleted";
		return new ResponseEntity<>(success, HttpStatus.OK);
	}

	// delete employee by employee Id from db: Medhane
	@DeleteMapping("/employees/{empId}/emp")
	public ResponseEntity<String> deleteEmployeeById(@PathVariable("empId") int empId) throws EmployeeException {
		System.out.println("delete ______________________________");
		adminService.deleteEmployeeByEmpId(empId);

		String success = "Employee Id: " + empId + " successfully deleted";
		return new ResponseEntity<>(success, HttpStatus.OK);
	}
	// pagination ...Desta
	@GetMapping("employees/pagination/{offset}/{pageSize}")
	public APIResponse<Page<Employee>> getAllEmployeeWithPagination(@PathVariable int offset, @PathVariable int pageSize){
		Page<Employee>pagination=adminService.findEmployeeWithPagination(offset, pageSize);
		return new APIResponse<>(pagination.getSize(),pagination);
	}
	//sorting..by all...Desta
	@GetMapping("employees/sorting/{name}")
	public APIResponse<List<Employee>>getAllEmployeeWithSort(@PathVariable String name){
		List<Employee>employees=adminService.findEmployeeWithSorting(name);

		return new APIResponse<>(employees.size(),employees);
	}

}
