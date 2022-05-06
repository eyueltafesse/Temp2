import axios from "axios";

const URL_ROOT = "${REACT_APP_API_LOCAL}";

export const addPod = async (podForm) => {
  try {
    const resp = await fetch(
      `http://localhost:9090/employees/${podForm.podAnchor}/pods`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(podForm),
      }
    );

    const jsonres = await resp.json();
    return jsonres;
  } catch (e) {
    console.error(e);
  }
};

export const getpodData = async (podId) => {
  try {
    const resp = await fetch(`http://localhost:9090/pods/${podId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const jsonres = await resp.json();
    console.log("response", jsonres);
    return jsonres;
  } catch (e) {
    console.error(e);
  }
};

export const getpodbyname = async (namePod) => {
  try {
    const resp = await fetch(`http://localhost:9090/pods/${namePod}/name/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const jsonres = await resp.json();
    console.log("response", jsonres);
    return jsonres;
  } catch (e) {
    console.error(e);
  }
};

export const getallPods = async () => {
  try {
    const resp = await fetch(`http://localhost:9090/pods`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const jsonres = await resp.json();
    console.log("response", jsonres);
    return jsonres;
  } catch (e) {
    console.error(e);
  }
};

export const editPod = async (podForm, podId) => {
  try {
    console.log(podForm);
    console.log(podId);
    const resp = await axios.put(
      `http://localhost:9090/employees/${podForm.podAnchor}/pods/${podId}`,
      podForm
    );
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const changeStatusPod = async (pod) => {
  try {
    console.log(pod);
    const podformat = { podId: pod };
    const resp = await axios.put(
      `http://localhost:9090/pods/status`,
      podformat
    );
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const searchEmployeebyId = async (empId) => {
  try {
    if (empId) {
      const searchid = await axios.get(
        `http://localhost:9090/employees/employeeId/${empId}`
      );

      return searchid;
    }
  } catch (e) {
    console.error(e);
  }
};
export const searchEmployeebyname = async (name) => {
  try {
    console.log("print name", name);
    if (name) {
      const respsearch = await axios.get(
        `http://localhost:9090/employees/${name}/name`
      );
      console.log(respsearch);
      return respsearch;
    }
  } catch (e) {
    console.error(e);
  }
};

export const addMember = async (empId, podId) => {
  try {
    if (empId) {
      const addemp = await axios.put(
        `http://localhost:9090/employees/${empId}/pods/${podId}/add`
      );
      console.log("value back", addemp);
      return addemp;
    }
  } catch (e) {
    console.error(e);
  }
};

export const removeMember = async (empId, podId) => {
  try {
    if (empId) {
      const removeemp = await axios.put(
        `http://localhost:9090/employees/${empId}/pods/${podId}/remove`
      );
      console.log("value back", removeemp);
      return removeemp;
    }
  } catch (e) {
    console.error(e);
  }
};
