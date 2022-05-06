package com.infy.associateApp.trainingCert.repository;
import com.infy.associateApp.trainingCert.domain.TrainingAndCertification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingAndCertificationRepo extends JpaRepository<TrainingAndCertification, Long> {

    List<TrainingAndCertification> findAllByEmpId(int empId);


    //List<TrainingAndCertification> findAllTrainingAndCertification();
    //List<TrainingAndCertification> findPrimarySkillsByEmployeeEmpId(int empId);
//	public TrainingAndCertification findTrainingAndCertificationByEmployeeEmpId(int empId);
//	void deleteByEmployeeEmpId(int empId);
//	public TrainingAndCertification findTrainingAndCertificationsByEmployeeEmpId(int empId);
//	List<TrainingAndCertification> findByStatus(String status);
//	public List<TrainingAndCertification> getAllTrainingAndCertification();

}
