package com.infy.associateApp.employee.service;

import com.infy.associateApp.employee.model.Admin;
import com.infy.associateApp.employee.model.Employee;
import com.infy.associateApp.employee.model.Role;
import com.infy.associateApp.employee.repo.EmployeeRepository;
import com.infy.associateApp.pod.logging.exception.EmployeeException;
import com.infy.associateApp.user.model.User;
import com.infy.associateApp.user.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("adminService")
public class AdminService {
	
	@Autowired
	private EmployeeRepository adminRepository;

	@Autowired
	private UserRepository userRepository;
	// Saves employee to the DB: David
	public Employee saveEmployee(Employee employee) throws EmployeeException {
		try {
			return adminRepository.save(employee);
		} catch (Exception e) {
			throw new EmployeeException("ADMIN_SERVICE.INVALID_DATA");
		}
	}
	// calls repo to create new employee in DB: David
	// Creates new user when new employee added: David
	public String createEmployee(Employee empData) throws EmployeeException {
		try {
			Admin admin = new Admin();
			Employee newEmployee = admin.assignEmployee(empData);

			newEmployee.setName(empData.getName());
			newEmployee.setInfosysEmailId(empData.getInfosysEmailId());
			newEmployee.setPhoneNumber(empData.getPhoneNumber());
			newEmployee.setJobLevel(empData.getJobLevel());
			newEmployee.setJoinDate(empData.getJoinDate());
			newEmployee.setCurrentLocation(empData.getCurrentLocation());
			newEmployee.setPods(empData.getPods());
			newEmployee.setInfosysTitle((empData.getInfosysTitle()));
			newEmployee.setProjectTitle((empData.getProjectTitle()));
			newEmployee.setStatusReason(empData.getStatusReason());
			newEmployee.setStatus(empData.getStatus());
			adminRepository.save(newEmployee);

			User user = new User(newEmployee.getEmpId());
			userRepository.save(user);

			return user.getInitialPassword();
		} catch (Exception e) {
			throw new EmployeeException("ADMIN_SERVICE.INVALID_DATA");
		}
	}
	// Gets all employees from DB: Medhane
	public List<Employee> getEmployees() throws EmployeeException {
		try {
			return adminRepository.findAll();
		} catch (Exception e) {
			throw new EmployeeException("ADMIN_SERVICE.CANNOT_RETRIEVE_DATA");
		}
	}
	// Calls repository function to query by EmpId: David
	public Employee getEmployeeById(int empId) {
		return adminRepository.getByEmpId(empId);
	}


	// calls repo function to query partial Name: Medhane
	public List<Employee> findEmployeeByName(String name) {
		return adminRepository.findByNameStartsWith(name);
	}

	// get employee By Id return List : Medhane
	public List<Employee> getByEmployeeId(int empId){
		return adminRepository.getByEmployeeId(empId);
	}


	// calls repo function to query Employee By Phone Number: Medhane
	public Employee findEmployeeByPhoneNumber(String number)  {
		return adminRepository.findEmployeeByPhoneNumber(number);
	}

	// calls repo function to query by Name: David
	public Employee getEmployeeByName(String name) {
		return adminRepository.getByName(name);
	}
	// calls repo function to query by employee Id: David
	public Employee getEmployeeByEmpId(int empId) {
		return adminRepository.getByEmpId(empId);
	}
	// calls repo function to query by Email: David
	public Employee getEmployeeByEmail(String infosysEmailId)  {
		return adminRepository.getByInfosysEmailId(infosysEmailId);
	}
	// Updates employee details with Admin Priv: David
	public void updateEmployee(Employee empData, int empId) throws EmployeeException {
		try {
			Employee existingEmployee = adminRepository.getByEmpId(empId);

			Role r = new Role(empData.getRole());
			existingEmployee.setRole(r.getRole());

			existingEmployee.setName(empData.getName());
			existingEmployee.setInfosysEmailId(empData.getInfosysEmailId());
			existingEmployee.setPhoneNumber(empData.getPhoneNumber());
			existingEmployee.setJobLevel(empData.getJobLevel());
			existingEmployee.setJoinDate(empData.getJoinDate());
			existingEmployee.setCurrentLocation(empData.getCurrentLocation());
//			existingEmployee.setPods(empData.getPods());
			existingEmployee.setStatus(empData.getStatus());
			existingEmployee.setStatusReason(empData.getStatusReason());
			existingEmployee.setProjectTitle(empData.getProjectTitle());
			existingEmployee.setInfosysTitle(empData.getInfosysTitle());

			adminRepository.save(existingEmployee);
		} catch (Exception e) {
			throw new EmployeeException("ADMIN_SERVICE.INVALID_DATA");
		}
	}
	// sets employees status to INACTIVE: David
	public void removeEmployee(int empId, String statusReason) throws EmployeeException {
		try {
			String status = "INACTIVE";
			Employee existingEmployee = adminRepository.getByEmpId(empId);
			existingEmployee.setStatus(status);
			existingEmployee.setStatusReason(statusReason);
			adminRepository.save(existingEmployee);
		} catch (Exception e) {
			throw new EmployeeException("ADMIN_SERVICE_INVALID_EMP_ID");
		}
	}
	// sets employee status to ACTIVE: David
	public void addEmployee(int empId, String statusReason) throws EmployeeException {
		try {
			String status = "ACTIVE";
			Employee existingEmployee = adminRepository.getByEmpId(empId);
			existingEmployee.setStatus(status);
			existingEmployee.setStatusReason(statusReason);
			adminRepository.save(existingEmployee);
		} catch (Exception e) {
			throw new EmployeeException("ADMIN_SERVICE_INVALID_EMP_ID");
		}
	}
	// deletes employee from db: David
	public void deleteAllEmployees() throws EmployeeException {
		try {
			adminRepository.deleteAll();
		} catch (Exception e) {
			throw new EmployeeException("ADMIN_SERVICE_INVALID_EMP_ID");
		}
	}

	//delete employee by employee Id from db: Medhane
	public void deleteEmployeeByEmpId(int empId) throws EmployeeException{
		try {
			adminRepository.deleteByEmployeeId(empId);
		}catch (Exception e){
			throw new EmployeeException("ADMIN_SERVICE_INVALID_EMP_ID");
		}

	}
	public Page<Employee> findEmployeeWithPagination(int offset, int pageSize){
		Page<Employee> employees=adminRepository.findAll(PageRequest.of(offset, pageSize));
		return employees;

	}
	public List<Employee>findEmployeeWithSorting(String field)
	{
		return adminRepository.findAll(Sort.by(Sort.Direction.ASC,field));
	}
}
