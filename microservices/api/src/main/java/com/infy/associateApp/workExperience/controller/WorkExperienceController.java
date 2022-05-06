package com.infy.associateApp.workExperience.controller;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.infy.associateApp.workExperience.model.WorkExperience;
import com.infy.associateApp.workExperience.repo.WorkExperienceRepo;
import com.infy.associateApp.workExperience.service.WorkExperienceService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WorkExperienceController {

	
	@Autowired
	private WorkExperienceRepo workExperienceRepo;
	@Autowired
	private WorkExperienceService workExperienceService;

	@GetMapping("/app-api/workexperiences/{empId}")
	public ResponseEntity<WorkExperience> getWorkExperienceByEmployeeId(@PathVariable int empId) {
		
		return new ResponseEntity<>(workExperienceService.getWorkExpByEmpId(empId), HttpStatus.OK);
	}

	@PostMapping("/app-api/workexperiences/{empId}")
	public ResponseEntity<WorkExperience> createWorkExperienceByEmployeeId(@PathVariable int empId,
			@RequestBody WorkExperience workExperience) {

		return new ResponseEntity<>(workExperienceService.createWorkExp(empId, workExperience), HttpStatus.CREATED);
	}

	@PatchMapping("/app-api/workexperiences/{empId}")
	public ResponseEntity<WorkExperience> updateWorkExperiences(@PathVariable int empId,
			@RequestBody WorkExperience workExperience) {

		return new ResponseEntity<>(workExperienceService.updateWorkExpDetails(empId, workExperience), HttpStatus.OK);
	}
//
//	@DeleteMapping("/app-api/workexperiences/{empId}")
//	@Transactional
//	public void deleteEmployeeWorkExperience(@PathVariable int empId) {
//		workExperienceRepo.deleteByEmployeeEmpId(empId);
//	}

}
