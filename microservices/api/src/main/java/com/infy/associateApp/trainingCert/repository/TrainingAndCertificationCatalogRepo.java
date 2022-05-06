package com.infy.associateApp.trainingCert.repository;

import com.infy.associateApp.trainingCert.domain.TrainingAndCertificationCatalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingAndCertificationCatalogRepo extends JpaRepository<TrainingAndCertificationCatalog, Long> {

	//public TrainingAndCertificationDetails findTrainingAndCertificationByEmployeeEmpId(int empId);

	//void deleteByEmployeeEmpId(int empId);
	public TrainingAndCertificationCatalog getById(long id);
	
	public TrainingAndCertificationCatalog getByNameLike(String type);

	public List<TrainingAndCertificationCatalog> getByTypeLike(String type);

	public List<TrainingAndCertificationCatalog> getByFilterTypeLike(String filter);

	public List<TrainingAndCertificationCatalog> findByNameStartsWith(String name);

}
