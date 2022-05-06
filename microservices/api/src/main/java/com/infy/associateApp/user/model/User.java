package com.infy.associateApp.user.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Random;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class User implements Serializable {
public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId = empId;
	}

	public String getInitialPassword() {
		return initialPassword;
	}

	public void setInitialPassword(String initialPassword) {
		this.initialPassword = initialPassword;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isUpdatedPassword() {
		return updatedPassword;
	}

	public void setUpdatedPassword(boolean updatedPassword) {
		this.updatedPassword = updatedPassword;
	}

	public String getSecurityQuestion() {
		return securityQuestion;
	}

	public void setSecurityQuestion(String securityQuestion) {
		this.securityQuestion = securityQuestion;
	}

	public String getSecurityAnswer() {
		return securityAnswer;
	}

	public void setSecurityAnswer(String securityAnswer) {
		this.securityAnswer = securityAnswer;
	}

	// Creates user table in db: David
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull
    @Column(unique=true)
    private int empId;
    @NotNull
    private String initialPassword;
    private String password;
    private boolean updatedPassword;
    private String securityQuestion;
    private String securityAnswer;

	// constructor for creating an initial user and generating initial password: David
    public User(int empId) {
        this.empId = empId;
        this.updatedPassword = false;
        generatePassword();
    }

    // Generates password 10 digits using ascii chars from 35-122: David
    public void generatePassword() {
        this.initialPassword = new Random().ints(10, 35, 122).collect(StringBuilder::new,
                StringBuilder::appendCodePoint, StringBuilder::append).toString();
    }
}
