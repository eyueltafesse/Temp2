import axios from "axios";

export const getallTraining = async () => {
  try {
    const resp = await axios.get(
      "http://localhost:9090/trainingandcertificationlist"
    );
    return resp;
  } catch (e) {
    console.log(e);
  }
};

export const addTrainingandCertifications = async (certId, tandc) => {
  try {
    const resp = await axios.post(
      `http://localhost:9090/tAndC/${certId}`,
      tandc
    );
    return resp;
  } catch (e) {
    console.log(e);
  }
};

export const getallTrainingbyEmployee = async (empId) => {
  try {
    const resp = await axios.get(`http://localhost:9090/tAndC/${empId}`);
    return resp;
  } catch (e) {
    console.log(e);
  }
};

export const removeItem = async (trainingId, empId) => {
  const resp = await axios.put(
    `http://localhost:9090/employees/${empId}/tAncC/${trainingId}`
  );
  return resp;
};

export const editTandC = async (statusOp, idTandC) => {
  try {
    const resp = await axios.put(
      `http://localhost:9090/tAndC/${idTandC}/status`,
      statusOp
    );
    return resp;
  } catch (e) {
    console.log(e);
  }
};

export const addCatalog = async (data) => {
  try {
    const resp = await axios.post(
      "http://localhost:9090/addtrainingandcertificationlist",
      data
    );
    return resp;
  } catch (e) {
    console.log(e);
  }
};
