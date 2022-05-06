package com.infy.associateApp.workExperience.repo;

import com.infy.associateApp.workExperience.model.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkExperienceRepo extends JpaRepository<WorkExperience,Integer> {

//     List<WorkExperience> findByEmployeeId(Integer workExId);
//     List<Employee> findByEmployeeName(String name);
//     void deleteByEmployeeId(Integer empId);
//     WorkExperience findByPrimarySkillsAndYearsOfExperience(String skills);
	
	WorkExperience findWorkExperienceByEmployeeEmpId(int employeeEmpId);
	void deleteByEmployeeEmpId(int empId);
}
