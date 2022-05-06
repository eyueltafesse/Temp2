package com.infy.associateApp.workExperience.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infy.associateApp.employee.repo.EmployeeRepository;
import com.infy.associateApp.pod.logging.ResourceAlreadyExistsException;
import com.infy.associateApp.pod.logging.ResourceNotFoundException;
import com.infy.associateApp.workExperience.model.WorkExperience;
import com.infy.associateApp.workExperience.repo.WorkExperienceRepo;

@Service
public class WorkExperienceService {
	@Autowired
	private WorkExperienceRepo workExperienceRepo;
	@Autowired
	private EmployeeRepository employeeRepository;

//     public List<WorkExperience> getAllWorkExperience(){
//    return workExperienceRepo.findAll();
//}

	public WorkExperience getWorkExperienceByEmployeeId(int empId) {
		return workExperienceRepo.findWorkExperienceByEmployeeEmpId(empId);
	}

	public WorkExperience createWorkExp(int empId, WorkExperience workExp) {
		if (workExperienceRepo.findWorkExperienceByEmployeeEmpId(empId) != null) {
			throw new ResourceAlreadyExistsException("Employee's Work Experience Details Already Exists!!!" + empId);
		}
//		  if(!workExperienceRepo.existsById(empId)) {
//			  throw new ResourceAlreadyExistsException("Employee Doesn't Exists!!!"+empId);
//		  }
		workExp.setEmployeeEmpId(empId);
		return workExperienceRepo.save(workExp);
	}

	public WorkExperience updateWorkExpDetails(int empId, WorkExperience workExp) {
		WorkExperience work = workExperienceRepo.findWorkExperienceByEmployeeEmpId(empId);
		if (workExp.getTotalYearsOfExperience() != 0) {

			work.setTotalYearsOfExperience(workExp.getTotalYearsOfExperience());

		}
		if (workExp.getTotalYearsOfExperienceInInfosys() != 0) {
			work.setTotalYearsOfExperienceInInfosys(workExp.getTotalYearsOfExperienceInInfosys());
		}
		if (workExp.getTotalYearsOfExperienceOutsideInfosys() != 0) {
			work.setTotalYearsOfExperienceOutsideInfosys(workExp.getTotalYearsOfExperienceOutsideInfosys());
		}
		return workExperienceRepo.save(work);
	}

	public WorkExperience getWorkExpByEmpId(int empId) {
		if (!employeeRepository.existsById(empId)) {
			throw new ResourceNotFoundException("Not Found Employee With Id = " + empId);
		}
		
		return getWorkExperienceByEmployeeId(empId);
		
	}

}
