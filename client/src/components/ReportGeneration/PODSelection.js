import { useState } from "react";
import React from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getpodData, getallPods } from "../../Services/ServicePod";

const PodSelection = () => {

  const [podList, setPodList] = useState([]);

  const params = useParams(); 
  const [reportData, setTableData] = useState({

         empId: "",
         name: "",
         infosysEmail: "",
         phoneNumber:"",
         jobLevel: "",
         joinDate: "",
         currentLocation: "",
         pod: "",
         totalyearsofExp: "",
         totalyearsofExpInInfosys: "",
         totalyearsofExpOutsideInfosys: "",
         primarySkills:"",
         trainingsAttended:"",
         certifications:""
    
    
    
        });

      const getPodArr = async () => {
        try {
          const respArr = await getallPods();
          console.log("print arr", respArr);
          if (respArr) {
            setPodList(
              respArr.map((pod) => ({ value: pod.podId, label: pod.podName }))
            );
          }
        } catch (e) {
          console.log(e);
        }
      };

      useEffect(() => {
        getPodArr();
      }, []);


  return (
  
      <div className="row">
    <div>
        <table className="table table-striped table-bordered">
       
          <thead>
           
        <tr className="bg-info">
            <th scope="col">Employee Id</th>
             <th scope="col">Name</th>
             <th scope="col">Infosys Email</th>
             <th scope="col">Phone </th>
             <th scope="col">Job Level</th>
             <th scope="col">Role</th>
             <th scope="col">Infosys Joining Date</th>
             <th scope="col">Current Location</th>
             <th scope="col">Pod</th>
             <th scope="col">Status</th>
             <th scope="col">Total Years Experience</th>
             <th scope="col">Primary Skills</th>
             <th scope="col">Trainings Attended</th>
             <th scope="col">Certifications</th>
             
        </tr>
      
       </thead>
       <tbody>

         {[podList].map((report) => (
                                    <tr key={report.EmployeeId}>
                                        <td>{report.Name}  </td>
                                        <td> {report.InfosysEmail} </td>
                                        <td> {podList.Phone } </td>
                                     
                                        <td> 212-313-3124 </td>
                                        <td> Associates </td>
                                        <td> DEV </td>

                                        <td> 01/02/2022 </td>
                                        <td> Mid-West </td>
                                        <td> 1 </td>
                                        <td> Active </td>
                                        <td> 2 years </td>
                                        <td> REACT </td>
                                        <td> yes </td>
                                        <td> REACT </td>
                                    </tr>
                                ))}

  </tbody>
        </table>


       
      </div>
    </div>




     );
};

export default PodSelection;
