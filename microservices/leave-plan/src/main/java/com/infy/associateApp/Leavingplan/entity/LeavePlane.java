package com.infy.associateApp.Leavingplan.entity;

import javax.persistence.*;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeavePlane {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private int id;

    //The empId can be duplicated since we
    //will save the historic of the leave plan : Esmeralda R.

    @NotNull
    private int empId;
    @NotNull
    private String reasonForLeave;
    @NotNull
    private  String startDate;
    @NotNull
    private  String endDate;
    @NotNull
    private  int daysOfLeave;
    @NotNull
    //email auth from
    private String authorizationFrom;
    @NotNull
    //email supervisor
    private String supervisor;
    //name of the Employee
    private String name;


}
