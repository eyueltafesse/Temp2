import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { getpodData, getallPods } from "../../Services/ServicePod";



const ReportGeneratePage = () => {

  const [podList, setPodList] = useState([]);
  const [searchPodVal, setSearchPodVal] = useState("");
  const [podData, setPodData] = useState({});



  const fetchPODData = async (evt) => {
    evt.preventDefault();

      if (searchPodVal !== "0") {
        const resp = await getpodData(searchPodVal);
        setPodData(resp);

      }
        else{
          console.log("search error")
        }
      
  };

      const getPod = async() =>{
        const respArr = await getallPods();
          if(respArr){
            setPodList(
              respArr.map((pod) => ({  label: pod.podName }))
            );
          }

      }

      const onChangeAllBox = (e)=>{
        setSearchPodVal(e.value)
        
      };

      useEffect(() => {
        getPod();
      }, []);


    return (

          
    <div className="report-wrapper">
      <div className="report-container">
        <Row className="title">
          <Col md={{ span: 4, offset: 4, height: 5 }}>
            <h2> POD Select </h2>
          </Col>
        </Row>
        <Row>
          <Form onSubmit={fetchPODData}>
            <Col md={{ span: 2, offset: 5 }}>
              <Form.Group className="mb-1" controlId="employeeId">
                <Form.Label>Select POD:</Form.Label>
                <select
                  className="form-control form-control-sm"
                  isSearchable={true}
                  options={podList}
                  placeholder="Select... "
                  onChange = {onChangeAllBox}
              
                  required
                  aria-label="Select Project Title"
                >
                 
                  {podList.map((pod) =>(
                    <option key={pod.podId} value={pod.label}>{pod.label}</option>
                  ))}

                <option value="select-all-podList"> Select ALL </option>

                </select>
               
                
              </Form.Group>
            </Col>
            <Col md={{ span:1, offset: 5 }}>
              <Button className="search-btn" type="submit" variant="primary" onClick={event => window.location.href=`/PODSelection/${searchPodVal}`}>
                Go 
              </Button>
            </Col>
          </Form>
        </Row>
        <hr />
      </div>
    </div>


    );
  };
  
  export default ReportGeneratePage;
  