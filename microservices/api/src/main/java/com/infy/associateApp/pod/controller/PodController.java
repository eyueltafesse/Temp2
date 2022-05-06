package com.infy.associateApp.pod.controller;

import com.infy.associateApp.employee.service.AdminService;
import com.infy.associateApp.pod.model.Pod;
import com.infy.associateApp.pod.service.PodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PodController {

    @Autowired
    private AdminService employeeService;

    @Autowired
    private PodService podService;

    // gets a list of all pods in db: David
    @GetMapping("/pods")
    public List<Pod> getPods() {
        return podService.getAllPods();
    }
    // Changes status of pod: David
    @PutMapping("/pods/status")
    public ResponseEntity<Object> status(@RequestBody Pod podData) {
        return new ResponseEntity<>(podService.changePodStatus(podData), HttpStatus.OK);
    }
    // gets an employee from database by id: David
    @GetMapping("/pods/{podId}")
    public ResponseEntity<Object> findPod(@PathVariable int podId) {
        return new ResponseEntity<>(podService.getPod(podId), HttpStatus.OK);
    }
    // Searches db for partial pod name matches: David
    @GetMapping("/pods/{podName}/name")
    public ResponseEntity<Set<Object>> searchName(@PathVariable String podName) {
        return new ResponseEntity<>(podService.searchPodName(podName), HttpStatus.OK);
    }
    // Searches db for pods from a specific anchor: David
    @GetMapping("/pods/{id}/anchor")
    public ResponseEntity<Set<Object>> searchAnchor(@PathVariable int id) {
        return new ResponseEntity<>(podService.searchAnchor(id), HttpStatus.OK);
    }
    // Creates new pod entry in DB: David
    @PostMapping("/employees/{empId}/pods")
    public ResponseEntity<Object> newPod(@Valid @RequestBody Pod podData, @PathVariable int empId) {
        return new ResponseEntity<>(podService.createPod(podData, empId), HttpStatus.OK);
    }
    // Edit pod details: David
    @PutMapping("employees/{empId}/pods/{podId}")
    public ResponseEntity<Object> editPodDetails(@Valid @RequestBody Pod podData, @PathVariable int empId,
                                                 @PathVariable int podId) {
        return new ResponseEntity<>(podService.editPod(empId, podData, podId), HttpStatus.OK);
    }
    // Adds employee to a pod: David
    @PutMapping("/employees/{empId}/pods/{podId}/add")
    public ResponseEntity<Object> addPod(@PathVariable int empId, @PathVariable int podId) {
        return new ResponseEntity<>(podService.assignPod(empId, podId), HttpStatus.OK);
    }
    // Remove employee from a pod: David
    @PutMapping("/employees/{empId}/pods/{podId}/remove")
    public ResponseEntity<Object> removePod(@PathVariable int empId, @PathVariable int podId) {
        return new ResponseEntity<>(podService.removeEmployee(empId, podId), HttpStatus.OK);
    }
}
