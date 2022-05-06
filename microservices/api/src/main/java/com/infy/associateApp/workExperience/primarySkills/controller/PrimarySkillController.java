package com.infy.associateApp.workExperience.primarySkills.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.infy.associateApp.workExperience.primarySkills.model.PrimarySkills;
import com.infy.associateApp.workExperience.primarySkills.repo.PrimarySkillsRepository;
import com.infy.associateApp.workExperience.primarySkills.service.PrimarySkillService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PrimarySkillController {

	@Autowired
	private PrimarySkillsRepository primarySkillsRepo;

	@Autowired
	private PrimarySkillService skillService;

	@GetMapping("/app-api/primaryskills/{workId}")
	public List<PrimarySkills> getPrimarySkillsByWorkId(@PathVariable int workId) {

		return primarySkillsRepo.findPrimarySkillsByWorkExpId(workId);

	}

	@PostMapping("/app-api/primaryskills/{workId}")
	public PrimarySkills addPrimarySkills(@PathVariable int workId, @RequestBody PrimarySkills primarySkills) {

		primarySkills.setWorkExpId(workId);

		return primarySkillsRepo.save(primarySkills);
	}

	@PutMapping("/app-api/primaryskills/{id}")
	public ResponseEntity<PrimarySkills> updatePrimarySkills(@PathVariable int id,
			@RequestBody PrimarySkills primarySkills) {

		return new ResponseEntity<>(skillService.updatePrimarySkillDetails(id, primarySkills), HttpStatus.OK);
	}

	@DeleteMapping("/app-api/primaryskills/{id}")
	public void deletePrimarySkill(@PathVariable int id) {
		primarySkillsRepo.deleteById(id);
	}

}
