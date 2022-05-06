package com.infy.associateApp.employee.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.infy.associateApp.pod.model.Pod;
import com.infy.associateApp.trainingCert.domain.TrainingAndCertification;
import com.infy.associateApp.workExperience.model.WorkExperience;
import com.infy.associateApp.workExperience.primarySkills.model.PrimarySkills;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// Creates Table in mysql: Medhane
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Employee implements Serializable {
	@Id
	private int empId;
	@NotNull
	private String role;
	private String name;
	@Column(unique = true)
	private String infosysEmailId;
	private String phoneNumber;
	private String jobLevel;
	private String status;
	private String statusReason;

	private String infosysTitle;
	@NotNull(message = "Project title is required")
	private String projectTitle;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate joinDate;
	private String currentLocation;

	//@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "employeeEmpId")
	private List<WorkExperience> workExperience;
   
	// Relationship between employee and pod: David
	@JsonIgnoreProperties("pod_employees")
	@ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinTable(
			name = "pod_employees",
            joinColumns = @JoinColumn(name = "emp_id"),
            inverseJoinColumns = @JoinColumn(name = "pod_id")
    )
	private Set<Pod> pods = new HashSet<>();

	// TrainingAndCertification is mapped by Employee via employeeEmpId
	//@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "empId")
	private Set<TrainingAndCertification> trainingAndCertifications;


	public void addTraining(TrainingAndCertification t) {
		trainingAndCertifications.add(t);
	}



	

//	public List<TrainingAndCertificationCatalog> getTrainingAndCertifications() {
//		return trainingAndCertifications;
//	}

//	public void setTrainingAndCertifications(List<TrainingAndCertificationCatalog> trainingAndCertifications) {
//		this.trainingAndCertifications = trainingAndCertifications;
//	}


}