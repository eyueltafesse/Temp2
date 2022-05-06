import axios from "axios";

export const getuserLogin = async (userData) => {
  try {
    const resp = await axios.get(
      `http://localhost:9090/users/${userData.empId}`
    );

    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const login = async (loginData) => {
  try {
    const resp = await axios.put(
      `http://localhost:9090/users/${loginData.empId}/login`,
      loginData
    );
    console.log(resp);
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const resetmainPassword = async (userData, empId) => {
  try {
    console.log(userData);
    const resp = await axios.put(
      `http://localhost:9090/users/${empId}/initial`,
      userData
    );
    console.log(resp);
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
    console.log(resp);
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const getForgotPwDetails = async (empId, updateData) => {
  try {
    const resp = await axios.put(`http://localhost:9090/users/${empId}/reset`, updateData);
    return resp;
  } catch (e) {
    console.error(e);
  }
};
