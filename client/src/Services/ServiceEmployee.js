import axios from "axios";

const URL_ROOT = "${REACT_APP_API_LOCAL}";

export const addEmployee = async (employee) => {
  try {
    const resp = await axios.post(`http://localhost:9090/employees`, employee);
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const userLogin = async (loginId) => {
  try {
    const resp = await axios.get(
      `http://localhost:9090/employees/${loginId.empId}/empId`
    );
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const getEmployeeData = async (id) => {
  try {
    const resp = await axios.get(`http://localhost:9090/employees/${id}/empId`);
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const searchEmployee = async (searchparams) => {
  try {
    const name = searchparams.name;
    const id = searchparams.empId;
    if (name) {
      const respsearch = await axios.get(
        `http://localhost:9090/employees/${name}/name`
      );
      console.log(respsearch);
      return respsearch;
    }
    if (id) {
      const searchid = await axios.get(
        `http://localhost:9090/employees/employeeId/${id}`
      );
      console.log(searchid);
      return searchid;
    }
  } catch (e) {
    console.error(e);
  }
};

export const searchAll = async () => {
  const getall = await axios.get(`http://localhost:9090/employees`);

  return getall;
};

export const updateEmployee = async (newdata) => {
  try {
    console.log("update data", newdata);
    const resp = await axios.put(
      `http://localhost:9090/employees/${newdata.empId}/admin`,
      newdata
    );
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const deleteEmployee = async (empId) => {
  try {
    const resp = await axios.delete(`http://localhost:9090/employees/${empId}`);
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const changeState = async (dataEmp) => {
  try {
    console.log(dataEmp);
    const resp = axios.put(`http://localhost:9090/employees/status`, dataEmp);
    return resp;
  } catch (e) {
    console.error(e);
  }
};
