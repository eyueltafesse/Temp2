package com.infy.associateApp.trainingCert.service;

import com.infy.associateApp.employee.model.Employee;
import com.infy.associateApp.employee.repo.EmployeeRepository;
import com.infy.associateApp.pod.logging.validator.Message;
import com.infy.associateApp.trainingCert.domain.TrainingAndCertification;
import com.infy.associateApp.trainingCert.domain.TrainingAndCertificationCatalog;
import com.infy.associateApp.trainingCert.repository.TrainingAndCertificationCatalogRepo;
import com.infy.associateApp.trainingCert.repository.TrainingAndCertificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class TrainingAndCertificationService {
    @Autowired
    private TrainingAndCertificationRepo tcRepo;
    @Autowired
    private TrainingAndCertificationCatalogRepo tcCatalogRepo;
    @Autowired
    private EmployeeRepository employeeRepository;

    // Returns all training and certs: David
    public Set<Object> findAllTCByEmpId(int empId) {
        Message m = new Message();
        Set<Object> mList = new HashSet<>();
        if (!employeeRepository.existsByEmpId(empId)) {
            m.add("Employee doesn't exist");
            mList.add(m);
            return mList;
        }
        List<TrainingAndCertification> tList = tcRepo.findAllByEmpId(empId);
        Set<Object> t = new HashSet<>(tList);
        return t;
    }
    // Creates a new training and cert, assigns to employee: David
    public Object createTandC(TrainingAndCertification tAndC, long id) {
        Message m = new Message();
        // validate employee and catalog exist
        int empId = tAndC.getEmpId();
        if (!employeeRepository.existsByEmpId(empId)) {
            m.add("This employee does not exist");
        }
        if (!tcCatalogRepo.existsById(id)) {
            m.add("This training does not exist");
        }
        // create instances
        Employee editEmp = employeeRepository.getByEmpId(empId);
        TrainingAndCertificationCatalog catalog = tcCatalogRepo.getById(id);
        // create set of certifications
        Set<TrainingAndCertification> l = editEmp.getTrainingAndCertifications();
        // iterate over set to verify employee doesn't already have cert
        for (TrainingAndCertification cert: l) {
            if (cert.getCertification().equals(catalog)) {
                m.add("Cannot add same certification more than once");
            }
        }
        if (m.isError()) {
            return m;
        }
        TrainingAndCertification newT = new TrainingAndCertification();
        newT.setCertification(catalog);
        newT.setStatus(tAndC.getStatus());
        newT.setEmpId(empId);

        editEmp.getTrainingAndCertifications().add(newT);

        tcRepo.save(newT);
        employeeRepository.save(editEmp);
        return editEmp;
    }
    // removes trainings from employee: David
    public Object removeTandC(int empId, long tAndCId) {
        if (!employeeRepository.existsByEmpId(empId)) {
            return new Message("Employee doesn't exist");
        }
        if (!tcRepo.existsById(tAndCId)) {
            return new Message("Certification doesn't exist");
        }
        Employee e = employeeRepository.getByEmpId(empId);
        tcRepo.deleteById(tAndCId);
        employeeRepository.save(e);

        Message message = new Message();
        message.addMessage("Certification successfully deleted");
        return message;
    }
    // Changes status of trainings: David
    public Object changeStatus(String status, long id) {
        if (!tcRepo.existsById(id)) {
            return new Message("Certification doesn't exist");
        }
        TrainingAndCertification tc = tcRepo.getById(id);
        tc.setStatus(status);
        return tcRepo.save(tc);
    }
}
