package com.infy.associateApp.employee.model;

import java.io.Serializable;


// Functional class for Admin Privileges: David
public class Admin extends Employee implements Serializable {
	int empId;
	String role;
	
	public Admin() { }

	// sets employeeId, Role, and pod for new Employee: David
	public Employee assignEmployee(Employee empData) {
		Role r = new Role(empData.getRole());
		Employee emp = new Employee();
		
		emp.setEmpId(empData.getEmpId());
		emp.setRole(r.role);
		return emp;
	}
	// updates employee with admin priv: David
    public void updateEmployee(Employee existingEmployee, Employee empData) {
        Role r = new Role(role);

        existingEmployee.setEmpId(empData.getEmpId());
        existingEmployee.setRole(empData.getRole());
    }

	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId = empId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
