package com.infy.associateApp.workExperience.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.infy.associateApp.project.service.ProjectService;
import com.infy.associateApp.workExperience.project.model.Project;
import com.infy.associateApp.workExperience.project.repo.ProjectRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

	@Autowired
	private ProjectRepository projectRepo;
	
	@Autowired
	private ProjectService proService;

	@PostMapping("/app-api/projects/{workId}")
	public Project createProject(@PathVariable int workId, @RequestBody Project project) {

		project.setWorkExpId(workId);
		return projectRepo.save(project);
	}

	@GetMapping("/app-api/projects/{workId}")
	public List<Project> getProjectByWorkId(@PathVariable int workId) {

		return projectRepo.findProjectByWorkExpId(workId);

	}

	@PutMapping("/app-api/projects/{id}")
	public Project updateProjects(@PathVariable int id, @RequestBody Project project) {

		return proService.updateProjectDetails(id, project);
	}
	

	@DeleteMapping("/app-api/projects/{id}")
	public void deleteProject(@PathVariable int id) {
		projectRepo.deleteById(id);
	}

}
