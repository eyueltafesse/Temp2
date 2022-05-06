package com.infy.associateApp.trainingCert.service.impl;

import com.infy.associateApp.trainingCert.domain.TrainingAndCertificationCatalog;
import com.infy.associateApp.trainingCert.repository.TrainingAndCertificationCatalogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingAndCertificationCatalogServiceImpli implements TrainingAndCertificationCatalogService {

	@Autowired
	private TrainingAndCertificationCatalogRepo trainingAndCertificationCatalogRepo;

	public List<TrainingAndCertificationCatalog> getAllTrainingAndCertificationDetails()  {
		try {
			return trainingAndCertificationCatalogRepo.findAll();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	public List<TrainingAndCertificationCatalog> getAllTrainingAndCertificationCatalogs() {
		return null;
	}


	@Override
	public List<TrainingAndCertificationCatalog> addTrainingAndCertificationDetails(
			TrainingAndCertificationCatalog tc) {
		trainingAndCertificationCatalogRepo.save(tc);
		return trainingAndCertificationCatalogRepo.findAll();
	}

	@Override
	public TrainingAndCertificationCatalog getcoursesAndCertificationCatalogById(long id) {
		// TODO Auto-generated method stub
		return trainingAndCertificationCatalogRepo.getById(id);
	}

	@Override
	public TrainingAndCertificationCatalog getcoursesAndCertificationCatalogByName(String name) {
		return trainingAndCertificationCatalogRepo.getByNameLike(name);
	}

	@Override
	public List<TrainingAndCertificationCatalog> coursesAndCertificationCatalogByType(String type) {
		// TODO Auto-generated method stub
		return trainingAndCertificationCatalogRepo.getByTypeLike(type);
	}

	@Override
	public List<TrainingAndCertificationCatalog> coursesAndCertificationCatalogByFilter(String filterType) {
		// TODO Auto-generated method stub
		return trainingAndCertificationCatalogRepo.getByFilterTypeLike(filterType);
	}

	@Override
	public List<TrainingAndCertificationCatalog> findByName(String name) {
		// TODO Auto-generated method stub
		return trainingAndCertificationCatalogRepo.findByNameStartsWith(name);
	}



}