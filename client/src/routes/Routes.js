import React, { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Employee from "../components/Employee/Employee";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import EditWork from "../components/WorkExp/EditWork";
import ViewWork from "../components/WorkExp/ViewWork";
import Signout from "../components/Login/Signout";
import EmployeeDetails from "../components/EmployeeDetails/EmployeeDetails";
import { UserContext } from "../context/UserContext";
import SearchEmployee from "../components/Search/SearchEmployee";
import Training from "../components/Training/Training";
import LeavePlan from "../components/LeavePlan/LeavePlan";
import PodEditView from "../components/Pod/PodEditView";
import UserAssignation from "../components/UserAssignation/UserAssignation";
import Pod from "../components/Pod/Pod";
import ResumeGeneration from "../components/ResumeGeneration/ResumeGeneration";
import ReportGeneration from "../components/ReportGeneration/ReportGeneration"


import PODSelection from "../components/ReportGeneration/PODSelection";
import ReportGeneratePage from "../components/ReportGeneration/ReportGeneratePage";



const RoutesComponent = () => {
  const [isEmployee, setIsEmployee] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/employeeDetails/:empId" element={<EmployeeDetails />} />
      <Route path="/employeeDetails/:empId/new" element={<EmployeeDetails />} />
      <Route path="/home" element={<Home />} />
      <Route path="/view" element={<SearchEmployee />} />
      <Route path="/Signout" element={<Signout />} />
      <Route path="/podDetails/:podId" element={<PodEditView />} />
      <Route path="/podSearch" element={<Pod />} />
      <Route path="/workexp/:empId/show" element={<ViewWork />} />
      <Route path="/workexp/:empId/edit" element={<EditWork />} />
      <Route path="/training/:empId" element={<Training />} />
      <Route path="/leavePlan/:empId" element={<LeavePlan />} />
      <Route path="/userAssignation/:podId" element={<UserAssignation />} />
      <Route path="/resume/:empId" element={<ResumeGeneration />} />
      <Route path="/reportgeneration" element={<ReportGeneration />} />
      <Route path="*" element={<Navigate to="/home" />} />

      <Route path="/ReportGeneratePage" element={<ReportGeneratePage />} />
      <Route path="/PODSelection/:label" element={<PODSelection />} />

    </Routes>
  );
};
// navigates to view workexp url: David

export default RoutesComponent;
