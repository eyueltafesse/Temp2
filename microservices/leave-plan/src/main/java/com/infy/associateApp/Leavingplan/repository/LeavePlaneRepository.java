package com.infy.associateApp.Leavingplan.repository;

import com.infy.associateApp.Leavingplan.entity.LeavePlane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeavePlaneRepository extends JpaRepository<LeavePlane,Integer> {



   // LeavePlane findByLeavePlaneId(int leavePlaneId);

    LeavePlane findByEmpId(int empId);

    @Query("select l from LeavePlane l where l.empId = ?1")
    List<LeavePlane> getByEmpId(int empId);

    LeavePlane getById(int id);
}
