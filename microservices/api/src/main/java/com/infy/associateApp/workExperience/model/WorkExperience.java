package com.infy.associateApp.workExperience.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.infy.associateApp.workExperience.primarySkills.model.PrimarySkills;
import com.infy.associateApp.workExperience.project.model.Project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperience implements Serializable {

		@Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private int workId;
	    private float totalYearsOfExperience;
	    private float totalYearsOfExperienceInInfosys;
	    private float totalYearsOfExperienceOutsideInfosys;
	    //private String primarySkillsAndYearsOfExperience;
	    private int employeeEmpId;
	    
	    //@JsonIgnore
		@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
		@JoinColumn(name = "workExpId")
	    @OnDelete(action = OnDeleteAction.CASCADE)
		private List<PrimarySkills> primarySkills;
	    
	    //@JsonIgnore
		@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
		@JoinColumn(name = "workExpId")
	    @OnDelete(action = OnDeleteAction.CASCADE)
		private List<Project> project;
   
    
    


}

