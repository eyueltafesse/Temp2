package com.infy.associateApp.trainingCert.controller;
import com.infy.associateApp.trainingCert.domain.TrainingAndCertification;
import com.infy.associateApp.trainingCert.service.TrainingAndCertificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TrainingAndCertificationController {
    @Autowired
    TrainingAndCertificationService tcService;


    @GetMapping("/tAndC/{empId}")
    public ResponseEntity <Set<Object>> getAllTrainingAndCertification(@PathVariable int empId){
        return new ResponseEntity<>(tcService.findAllTCByEmpId(empId), HttpStatus.OK);
    }
    // Create new t and c and add to employee: David
    @PostMapping("/tAndC/{certId}")
    public ResponseEntity<Object> createNewTC(@RequestBody TrainingAndCertification tAndC, @PathVariable long certId) {
        return new ResponseEntity<>(tcService.createTandC(tAndC, certId), HttpStatus.OK);
    }
    // Changes status of trainings: David
    @PutMapping("/tAndC/{certId}/status")
    public ResponseEntity<Object> status(@RequestBody TrainingAndCertification tc, @PathVariable long certId) {
        return new ResponseEntity<>(tcService.changeStatus(tc.getStatus(), certId), HttpStatus.OK);
    }
    // Removes trainings from employee: David
    @PutMapping("/employees/{empId}/tAncC/{certId}")
    public ResponseEntity<Object> remove(@PathVariable int empId, @PathVariable long certId) {
        return new ResponseEntity<>(tcService.removeTandC(empId, certId), HttpStatus.OK);
    }
}

