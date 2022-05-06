package com.infy.associateApp.workExperience.primarySkills.repo;

import com.infy.associateApp.workExperience.primarySkills.model.PrimarySkills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository 
public interface PrimarySkillsRepository extends JpaRepository<PrimarySkills, Integer> {
	
	List<PrimarySkills> findPrimarySkillsByWorkExpId(int workExpId);
	void deleteById(int id);
	
	PrimarySkills findById(int id);

}
