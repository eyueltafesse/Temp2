package com.infy.associateApp.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infy.associateApp.workExperience.project.model.Project;
import com.infy.associateApp.workExperience.project.repo.ProjectRepository;

@Service 
public class ProjectService {
	
	@Autowired
	private ProjectRepository proRepo;
	
	public Project updateProjectDetails(int id, Project project) {
		Project updateProjectById = proRepo.findProjectByProjectId(id);
		if (!(project.getProjectDesc() == null)) {

			updateProjectById.setProjectDesc(project.getProjectDesc());

		}
		if (!(project.getRole() == null)) {

			updateProjectById.setRole(project.getRole());

		}
		if (!(project.getResponsibilities() == null)) {

			updateProjectById.setResponsibilities(project.getResponsibilities());

		}

		return proRepo.save(updateProjectById);
	}

}
