package com.infy.associateApp.workExperience.primarySkills.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Desta, Laxman

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrimarySkills implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String primarySkills;
	private int totalYearsWorked;
	private int workExpId;
	

	
	

}
