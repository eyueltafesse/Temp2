package com.infy.associateApp.workExperience.project.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infy.associateApp.workExperience.project.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer>{
		
	List<Project> findProjectByWorkExpId(int workExpId);
	Project findProjectByProjectId(int projectId);
	void deleteById(int id);
}
