package com.infy.associateApp.trainingCert.controller;

import com.infy.associateApp.trainingCert.domain.TrainingAndCertificationCatalog;
import com.infy.associateApp.trainingCert.service.impl.TrainingAndCertificationCatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TrainingAndCertificationCatalogController {

	@Autowired
	private TrainingAndCertificationCatalogService tcService;

	/* API Related to TrainingAndCertification */

	// For getting  all courses and certification list from Hari.
	@GetMapping("/trainingandcertificationlist")
	public List<TrainingAndCertificationCatalog> AllCertificationsList() {
		return tcService.getAllTrainingAndCertificationDetails();
	}

	// For getting Courses and Certification Catalog by ID from Hari.
	@GetMapping("/trainingandcertification/{id}")
	public TrainingAndCertificationCatalog coursesAndCertificationCatalogById(@PathVariable long id) {

		return tcService.getcoursesAndCertificationCatalogById(id);
	}

	// For getting Courses and Certification Catalog by Name from Hari.
	@GetMapping("/trainingandcertificationname/{name}")
	public List<TrainingAndCertificationCatalog> coursesAndCertificationCatalogByName(@PathVariable String name) {

		return tcService.findByName(name);
	}

	// For getting Courses and Certification Catalog by Type from Hari.
	@GetMapping("/trainingandcertificationtype/{type}")
	public List<TrainingAndCertificationCatalog> coursesAndCertificationCatalogByType(@PathVariable String type) {

		return tcService.coursesAndCertificationCatalogByType(type);
	}
	
	
	// For getting Courses and Certification Catalog by Filter from Hari.
		@GetMapping("/trainingandcertificationfilter/{filterType}")
		public List<TrainingAndCertificationCatalog> coursesAndCertificationCatalogByFilter(@PathVariable String filterType) {

			return tcService.coursesAndCertificationCatalogByFilter(filterType);
		}

	// For adding all courses and certification list from Hari.
	@PostMapping("/addtrainingandcertificationlist")
	public List<TrainingAndCertificationCatalog> Addtrainingandcertificationlist(
			@RequestBody TrainingAndCertificationCatalog tc) {
		return tcService.addTrainingAndCertificationDetails(tc);
	}

}