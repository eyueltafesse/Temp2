package com.infy.associateApp.pod.service;

import com.infy.associateApp.employee.model.Employee;
import com.infy.associateApp.employee.repo.EmployeeRepository;
import com.infy.associateApp.employee.service.AdminService;
import com.infy.associateApp.pod.logging.validator.Message;
import com.infy.associateApp.pod.model.Pod;
import com.infy.associateApp.pod.repo.PodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class PodService {
    @Autowired
    private PodRepository podRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AdminService adminService;

    // gets all list of all pods in DB: David
    public List<Pod> getAllPods() {
        return podRepository.findAll();
    }
    // gets a pod by podId: David
    public Object getPod(int podId) {
        PodValidator validator = new PodValidator(podId, podRepository);
        if (validator.errors.isError()) {
            return validator.errors;
        }
        return podRepository.getByPodId(podId);
    }
    // Search pod by name: David
    public Set<Object> searchPodName(String podName) {
        if (podName.isEmpty()) {
            Set<Object> m = new HashSet<>();
            m.add(new Message("Please enter Pod Name"));
            return m;
        }
        Set<Object> podList = new HashSet<>(podRepository.findByPodNameStartsWith(podName));
        if (podList.isEmpty()) {
            podList.add(new Message("No Results Found"));
            return podList;
        }
        return podList;
    }
    // Search by podAnchor: David
    public Set<Object> searchAnchor(int podAnchor) {
        Set<Object> podList = new HashSet<>(podRepository.findByPodAnchor(podAnchor));
        if (podList.isEmpty()) {
            podList.add(new Message("No Results found"));
            return podList;
        }
        return podList;
    }
    // creates new pod in DB: David
    public Object createPod(Pod podData, int empId) {
        PodValidator validator = new PodValidator(podData, empId, employeeRepository, podRepository);
        if (validator.errors.isError()) {
            return validator.errors;
        }
        Employee anchor = employeeRepository.getByEmpId(podData.getPodAnchor());
        podData.setAnchorName(anchor.getName());
        return podRepository.save(podData);
    }
    // edit existing pod in db: David
    public Object editPod(int empId, Pod podData, int podId) {
        PodValidator validator = new PodValidator(podData, empId, podId, employeeRepository, podRepository);
        if (validator.errors.isError()) {
            return validator.errors;
        }
        Employee anchor = employeeRepository.getByEmpId(podData.getPodAnchor());
        podData.setAnchorName(anchor.getName());
        return podRepository.save(podData);
    }
    // assigns pod to employee: David
    public Object assignPod(int empId, int podId) {
        boolean add = true;
        PodValidator validator = new PodValidator(empId, podId, add, employeeRepository, podRepository);
        if (validator.errors.isError()) {
            return validator.errors;
        }
        Employee emp = adminService.getEmployeeByEmpId(empId);
        Pod pod = podRepository.getByPodId(podId);
        emp.getPods().add(pod);
        pod.getPodEmployees().add(emp);
        employeeRepository.save(emp);
        return getPod(podId);
    }
    // removes employee from pod: David
    public Object removeEmployee(int empId, int podId) {
        boolean add = false;
        PodValidator validator = new PodValidator(empId, podId, add, employeeRepository, podRepository);
        if (validator.errors.isError()) {
            return validator.errors;
        }
        Employee emp = adminService.getEmployeeByEmpId(empId);
        Pod pod = podRepository.getByPodId(podId);
        emp.getPods().remove(pod);
        employeeRepository.save(emp);
        return pod;
    }
    // Changes status of pod: David
    public Object changePodStatus(Pod podData) {
        int podId = podData.getPodId();
        Pod pod = podRepository.getByPodId(podId);
        // if pod is active set pod to active and save
        if (pod.getStatus().equalsIgnoreCase("inactive")) {
            pod.setStatus("ACTIVE");
            return podRepository.save(pod);
        }
        pod.setStatus("INACTIVE");
        podRepository.save(pod);
        // changes the status of the employees in the pod: David
        changePodEmployeeStatus(podId);
        return pod;
    }
    // Changes the status of employees in a pod, if pod is changed to inactive: David
    // Use hashmap to iterate over employees to avoid concurrent modification exception
    public void changePodEmployeeStatus(int podId) {
        Pod pod = podRepository.getByPodId(podId);
        Set<Employee> empList = pod.getPodEmployees();
        Map<Integer, Employee> empMap = new HashMap<>();
        // assign empId as key and employee object as value, if status is active.
        for (Employee e: empList) {
            if (e.getStatus().equalsIgnoreCase("Active"))
                empMap.put(e.getEmpId(), e);
        }
        // iterate through map validating change status requirements using key
        for (Map.Entry<Integer, Employee> i : empMap.entrySet()) {
            boolean inactive = false;
            int empId = i.getKey();
            Employee editEmp = i.getValue();
            if (onlyOnePod(empId))
                inactive = true;
            else if (lessThanTwoPod(empId))
                inactive = true;
            else if (checkMultiplePodStatus(empId))
                inactive = true;

            if (inactive) {
                editEmp.setStatus("INACTIVE");
                employeeRepository.save(editEmp);
            }
        }
    }
    // If job title only allows employee to be assigned to one pod returns true: David
    public boolean onlyOnePod(int empId) {
        Set<String> titleList = new HashSet<>(Arrays.asList("developer","business analyst", "qa"));
        Employee editEmp = employeeRepository.getByEmpId(empId);
        return titleList.contains(editEmp.getProjectTitle().toLowerCase());
    }
    // if employee has a job title that could be assigned to more than one pod is only assigned to one pod,
    // return true: David
    public boolean lessThanTwoPod(int empId) {
        Employee editEmp = employeeRepository.getByEmpId(empId);
        return editEmp.getPods().size() < 2;
    }
    // if employee is assigned to more than one pod, checks the rest of employees pods for active status, if all pods
    // are inactive, returns true: David
    public boolean checkMultiplePodStatus(int empId) {
        Employee e = employeeRepository.getByEmpId(empId);
        Set<Pod> pods = e.getPods();
        return pods.stream().noneMatch(p -> p.getStatus().equalsIgnoreCase("active"));
    }
}

