package com.infy.associateApp.trainingCert.service.impl;

import com.infy.associateApp.trainingCert.domain.TrainingAndCertificationCatalog;

import java.util.List;

public interface TrainingAndCertificationCatalogService {
	public List<TrainingAndCertificationCatalog> getAllTrainingAndCertificationDetails();
	 public List<TrainingAndCertificationCatalog> getAllTrainingAndCertificationCatalogs();
	public List<TrainingAndCertificationCatalog> addTrainingAndCertificationDetails(TrainingAndCertificationCatalog tc);
	public TrainingAndCertificationCatalog getcoursesAndCertificationCatalogById(long id);
	public TrainingAndCertificationCatalog getcoursesAndCertificationCatalogByName(String name);
	public List<TrainingAndCertificationCatalog> coursesAndCertificationCatalogByType(String name);
	public List<TrainingAndCertificationCatalog> coursesAndCertificationCatalogByFilter(String filterType);
	public List<TrainingAndCertificationCatalog> findByName(String name);

}