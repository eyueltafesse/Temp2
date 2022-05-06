import axios from "axios";

//funtion that returns the list of the live plans of the employee
//by:Esmeralda R.
export const getLPlansbyEmployee = async (empId) => {
  try {
    const resp = await axios.get(
      `http://localhost:9191/LeavePlan/all/${empId}`
    );
    console.log(resp.data);
    return resp;
  } catch (e) {
    console.error(e);
  }
};

//funtion that returns the employee by email
//used to get the name of the Supervisor and role
//by:Esmeralda R.
export const getSupEmail = async (email) => {
  try {
    const resp = await axios.get(
      `http://localhost:9090/employees/${email}/email`
    );
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const createLeave = async (bodyData, supName) => {
  try {
    const res = await axios.post(
      `http://localhost:9191/LeavePlan/new/${supName}`,
      bodyData
    );
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const editLeave = async (bodyData, supName, leaveId) => {
  try {
    console.log("Print incomin data :", bodyData, supName, leaveId);
    const res = await axios.put(
      `http://localhost:9191/LeavePlan/update/${leaveId}/${supName}`,
      bodyData
    );
    return res;
  } catch (e) {
    console.error(e);
  }
};
