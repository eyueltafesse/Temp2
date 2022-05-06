package com.infy.associateApp.Leavingplan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infy.associateApp.Leavingplan.entity.LeavePlane;
import com.infy.associateApp.Leavingplan.service.EmailNotificationService;
import com.infy.associateApp.Leavingplan.service.LeavePlaneService;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

@RestController
@RequestMapping("/LeavePlan")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class LeavePlaneController {

    @Autowired
    private LeavePlaneService leavePlaneService;
    
    @Autowired
	EmailNotificationService emailService;
	

    @PostMapping("/")
    public LeavePlane saveLeavePlane(@RequestBody LeavePlane leavePlane){
        log.info("Inside saveLeavePlane method of LeavePlaneController");
        String messageBody = "This is to notify that "+ leavePlane.getName() + " will take "+leavePlane.getReasonForLeave() +
				" leave for " +leavePlane.getStartDate()+" to "+leavePlane.getEndDate()+ ". This is authorized by "+leavePlane.getAuthorizationFrom();
		emailService.sendEmail(leavePlane.getSupervisor(), messageBody,"Leave Notification");
        return leavePlaneService.saveLeavePlane(leavePlane);
    }

    //Factorization of the code to save a Leave Plan
    //New format for the Email in base of the requirements
    //Esmeralda R.
    @PostMapping("/new/{SupName}")
    public LeavePlane newLeavePlane(@RequestBody LeavePlane leavePlane,@PathVariable String SupName) throws Exception{
        log.info("Inside saveLeavePlane method of LeavePlaneController");
        return leavePlaneService.createLeavePlane(leavePlane, SupName);
    }


    @GetMapping("/{id}")
    public LeavePlane findLeavePlaneById(@PathVariable("id") int leavePlaneId){
        log.info("Inside findLeavePlaneById method of LeavePlaneController");
        return  leavePlaneService.findLeavePlaneById(leavePlaneId);
    }

    @GetMapping("/all/{empId}")
    public List<LeavePlane> getByEmployeeId(@PathVariable int empId) throws Exception{
        return leavePlaneService.getLeavePlaneById(empId);
    }

    @PutMapping("/update/{id}/{supName}")
    public ResponseEntity<LeavePlane> updateLeavePlan(@PathVariable int id, @RequestBody LeavePlane leavePlan, @PathVariable String supName) throws Exception{
    		log.info("Inside update controller");
    	return new ResponseEntity<LeavePlane>(leavePlaneService.updateLeavePlan(leavePlan,id, supName), HttpStatus.OK);
    }

}


