package com.infy.associateApp.pod.service;

import com.infy.associateApp.employee.model.Employee;
import com.infy.associateApp.employee.repo.EmployeeRepository;
import com.infy.associateApp.pod.logging.validator.Message;
import com.infy.associateApp.pod.model.Pod;
import com.infy.associateApp.pod.repo.PodRepository;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

// Custom pod details validator: David
@NoArgsConstructor
public class PodValidator {

    private EmployeeRepository employeeRepository;
    private PodRepository podRepository;
    Pod podData;
    int empId;
    int anchorId;
    int podId;
    String podName;
    public Message errors = new Message();
    boolean add;
    boolean error;

    // constructor to to validate pod exists: David
    public PodValidator(int podId, PodRepository podRepository) {
        this.podId = podId;
        this.podRepository = podRepository;
        this.error = errors.isError();
        exists(podId);
    }

    // constructor for employee to podEmployees (Set):David
    public PodValidator(int empId, int podId, boolean add, EmployeeRepository employeeRepository, PodRepository podRepository) {
        this.empId = empId;
        this.podId = podId;
        this.add = add;
        this.error = errors.isError();
        this.employeeRepository = employeeRepository;
        this.podRepository = podRepository;
        if (!exists(empId, podId)) {
            validAddEmployee();
        }
    }
    // constructor to validate pod for create method: David
    public PodValidator(Pod podData, int empId, EmployeeRepository employeeRepository, PodRepository podRepository) {
        this.podData = podData;
        this.anchorId = podData.getPodAnchor();
        this.podName = podData.getPodName();
        this.empId = empId;
        this.error = errors.isError();
        this.employeeRepository = employeeRepository;
        this.podRepository = podRepository;
        validEmployee();
        validAnchor();
        uniquePodName();
    }
    // Constructor to validate pod for edit method: David
    public PodValidator(Pod podData, int empId, int podId, EmployeeRepository employeeRepository, PodRepository podRepository) {
        this.podData = podData;
        this.anchorId = podData.getPodAnchor();
        this.podName = podData.getPodName();
        this.empId = empId;
        this.podId = podId;
        this.error = errors.isError();
        this.employeeRepository = employeeRepository;
        this.podRepository = podRepository;
        exists();
        validEmployee();
        validAnchor();
        uniquePodName();
    }
    // Validates employee data: David
    public void validEmployee() {
        if (!employeeRepository.existsByEmpId(empId)) {
            errors.add("Employee does not exist");
        } else {
            // create instance of employee, check role for permissions
            Employee test = employeeRepository.getByEmpId(empId);
            if (test.getRole().equals("EMPLOYEE")) {
                errors.add("You do not have permission to create a pod");
            }
        }
    }
    // Validates pod data: David
    public void validAnchor() {
        // checks db for pod anchor and checks permission
        if (employeeRepository.existsByEmpId(podData.getPodAnchor())) {
            Employee test = employeeRepository.getByEmpId(podData.getPodAnchor());
            String role = test.getRole();
            if (role.equals("ADMIN") || role.equals("EMPLOYEE")) {
                errors.add("Only a Supervisor can be a Pod Anchor");
            }
        } else {
            errors.add("Pod Anchor does not exist");
        }
    }
    // Verifies pod name is unique: David
    public void uniquePodName(){
        String name = podData.getPodName();
        if (podRepository.existsByPodName(name)) {
            Pod test = podRepository.findByPodName(name);
            if (podData.getPodId() != test.getPodId()) {
                errors.add("Pod name already exists");
            }
        }
    }
    // verifies pod exists in db: David
    public void exists() {
        if (!podRepository.existsById(podId)) {
            errors.add("Pod doesn't exist");
        }
        if (podId != podData.getPodId()) {
            errors.add("Invalid pod ID");
        }
    }
    // verifies pod exists by podId: David
    public void exists(int podId) {
        if (!podRepository.existsById(podId)) {
            errors.add("Pod doesn't exist");
        }
    }
    // verifies pod and employee exist in db: David
    public boolean exists(int empId, int podId) {
        if (!employeeRepository.existsByEmpId(empId)) {
            errors.add("Employee doesn't exist");
        }
        if (!podRepository.existsById(podId)) {
            errors.add("Pod doesn't exist");
        }
        return errors.isError();
    }
    // verifies job title and amount of pods: David
    public void validAddEmployee() {
        Employee emp = employeeRepository.getByEmpId(empId);
        String title = emp.getProjectTitle();
        Pod pod = podRepository.getByPodId(podId);
        Set<String> titleList = new HashSet<>(Arrays.asList("developer","business analyst", "qa"));
        if (add) {
            if (pod.getPodEmployees().contains(emp)) {
                errors.add("Employee already exists in this pod.");
            }
            else if (titleList.contains(title.toLowerCase()) && (emp.getPods().size() > 0)) {
                errors.add(title + " can only be assigned to one pod at a time");
            }
        } else {
            if (!emp.getPods().contains(pod)) {
                errors.add("Employee doesn't exist in this pod");
            }
        }
    }
}
