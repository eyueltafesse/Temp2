package com.infy.associateApp.workExperience.primarySkills.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infy.associateApp.workExperience.primarySkills.model.PrimarySkills;
import com.infy.associateApp.workExperience.primarySkills.repo.PrimarySkillsRepository;
import com.infy.associateApp.workExperience.project.model.Project;

@Service 
public class PrimarySkillService {
	
	@Autowired
	private PrimarySkillsRepository primarySkillRepo;
	
	public PrimarySkills updatePrimarySkillDetails(int id, PrimarySkills primarySkill) {
		PrimarySkills updateSkills = primarySkillRepo.findById(id);
		if (!(primarySkill.getPrimarySkills() == null)) {

			updateSkills.setPrimarySkills(primarySkill.getPrimarySkills());

		}
		if (!(primarySkill.getTotalYearsWorked() == 0)) {

			updateSkills.setTotalYearsWorked(primarySkill.getTotalYearsWorked());;

		}
		

		return primarySkillRepo.save(updateSkills);
	}

}
