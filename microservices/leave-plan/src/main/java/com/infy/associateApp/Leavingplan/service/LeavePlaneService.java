package com.infy.associateApp.Leavingplan.service;

import com.infy.associateApp.Leavingplan.entity.LeavePlane;
import com.infy.associateApp.Leavingplan.repository.LeavePlaneRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Slf4j
public class LeavePlaneService {

    @Autowired
    private LeavePlaneRepository leavePlaneRepository;
    @Autowired
    EmailNotificationService emailService;

    public LeavePlane saveLeavePlane(LeavePlane leavePlane) {
        log.info("inside saveLeavePlane of LeavePlaneService");
        return leavePlaneRepository.save(leavePlane);
    }

    //Create a LeavePlan and Format for the Email: Esmeralda R.
    public LeavePlane createLeavePlane(LeavePlane leavePlaneData, String supName) throws Exception {
            try {
                LeavePlane newLeaveP = new LeavePlane();
                newLeaveP.setName(leavePlaneData.getName());
                newLeaveP.setEmpId(leavePlaneData.getEmpId());
                newLeaveP.setAuthorizationFrom(leavePlaneData.getAuthorizationFrom());
                newLeaveP.setDaysOfLeave(leavePlaneData.getDaysOfLeave());
                newLeaveP.setEndDate(leavePlaneData.getEndDate());
                newLeaveP.setStartDate(leavePlaneData.getStartDate());
                newLeaveP.setReasonForLeave(leavePlaneData.getReasonForLeave());
                newLeaveP.setSupervisor(leavePlaneData.getSupervisor());
                if(!supName.equalsIgnoreCase("SUPERVISOR")){
                    emailNotification(leavePlaneData, supName);
                }
                return leavePlaneRepository.save(newLeaveP);

            } catch (Exception e) {
                throw new RuntimeException( e.getCause() + "Failed to save the leave plan error: " + e.getMessage());
            }
     }
    //Notification and email Body format: Esmeralda R.
     public void emailNotification(LeavePlane leavePlaneData, String supName) throws Exception{
        try{
            LocalDateTime dateTime = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy HH:mm");


            String messageBody ="Hi  "+ supName +",\nThis is to notify you that " + leavePlaneData.getName() + " will take " + leavePlaneData.getReasonForLeave() +
                    " leave for "+leavePlaneData.getDaysOfLeave()+" day(s) from " + leavePlaneData.getStartDate() + " to " + leavePlaneData.getEndDate() + ".\nThis is authorized by " + leavePlaneData.getAuthorizationFrom() +
                    "\n\nHave a great day! \n\nRegards,\nThe Associate App\n"+dateTime.format(formatter);

            emailService.sendEmail(leavePlaneData.getSupervisor(), messageBody, "Leave Notification");

        } catch (Exception e) {
            throw new Exception( e.getCause() + "Failed to send the notification email for the leave plan, error: " + e.getMessage());
        }

     }

    public LeavePlane findLeavePlaneById(int empId) {
        log.info("inside findLeavePlaneById of LeavePlaneService");
        return leavePlaneRepository.findByEmpId(empId);
    }

    public List<LeavePlane> getLeavePlaneById(int empId) throws Exception{
        try {
            log.info("getLeavePlaneById of LeavePlaneService");
            return leavePlaneRepository.getByEmpId(empId);
        }catch (Exception e){
            throw new Exception("Failed to get the list of the Leave Plans" + e.getMessage());
        }

    }
    //Update Leave Plan: Laxman/Prudhvi/Esmeralda
    public LeavePlane updateLeavePlan(LeavePlane leavePlan,int id, String supName) throws Exception{
        try {
            LeavePlane existingLeavePlan = leavePlaneRepository.getById(id);
            existingLeavePlan.setReasonForLeave(leavePlan.getReasonForLeave());
            existingLeavePlan.setStartDate(leavePlan.getStartDate());
            existingLeavePlan.setEndDate(leavePlan.getEndDate());
            existingLeavePlan.setDaysOfLeave(leavePlan.getDaysOfLeave());
            existingLeavePlan.setAuthorizationFrom(leavePlan.getAuthorizationFrom());
            existingLeavePlan.setSupervisor(leavePlan.getSupervisor());

            emailNotification(leavePlan, supName);
            return leavePlaneRepository.save(existingLeavePlan);
        }catch (Exception e){
            throw new Exception("Failed to update the Leave Plan, error:" + e.getMessage());
        }
        }


}
