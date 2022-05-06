package com.infy.associateApp.employee.repo;

import com.infy.associateApp.employee.model.Employee;
import com.infy.associateApp.pod.model.Pod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	// Query to return employee by name: David
	public Employee getByName(String name);
	// Query to return employee by employee ID: David
	public Employee getByEmpId(int empID);
	// Query returns employee with matching Email: David
	public Employee getByInfosysEmailId(String infosysEmailId);
	// delete employee by empId: David
	public Employee deleteByEmpId(int empId);
	// Deletes all entries from db: David
	public void deleteAll();


	//  return list of employees by name: Medhane
	List<Employee> findByNameStartsWith(String name);

	// return Employee By phone Number: Medhane
	Employee findEmployeeByPhoneNumber(String number);

	//return Employee By Id :Medhane
	@Query("SELECT e FROM Employee e WHERE e.empId = ?1")
	List<Employee> getByEmployeeId(int empId);

	@Modifying
	@Query("delete from Employee e where e.empId =?1 ")
	void deleteByEmployeeId(@Param("empId") int empId);

    boolean existsByEmpId(int empId);

	boolean existsByInfosysEmailId(String infosysEmailId);

	boolean existsByPhoneNumber(String phoneNumber);

	Set<Pod> getPodsByEmpId(int empId);
}
