package com.infy.associateApp.employee.model;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

public class Role {
	
	final String[] roleOptions = {"ADMIN", "SUPERVISOR", "EMPLOYEE"};
	@NotNull(message = "please enter Employee role")
	String role;
	
	public Role(String role) {
		ArrayList<String> options = new ArrayList<>();
		role = role.toUpperCase();
		for (String i : roleOptions) {
			options.add(i.toUpperCase());
		}
		if (options.contains(role)) {
			this.role = role;
		}
	}

	public String getRole() {
		return role;
	}
}
