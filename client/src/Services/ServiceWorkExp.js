import axios from "axios";

const URL_ROOT = "${REACT_APP_API_LOCAL}";

// api call adds work exp to DB: David
export const addWorkExp = async (empId, workExperience) => {
    try {
        const data = await axios.post(`http://localhost:9090/app-api/workexperiences/${empId}`, workExperience);
        return data;
    } catch (e) {
        console.log(e);
    }
}
// api call to get employees work exp: David 
export const getWorkExp = async (empId) => {
    try {
        const data = await axios.get(`http://localhost:9090/app-api/workexperiences/${empId}`);
        return data;
    } catch (e) {
        console.log(e); 
    }
}
// api call to update work exp details: David 
export const updateWorkExp = async (empId, updateData) => {
    try {
        const data = await axios.patch(`http://localhost:9090/app-api/workexperiences/${empId}`, updateData)
        return data;
    } catch (e) {
        console.log(e)
    }
}
// api call to delete workexperience: David
export const deleteWorkExp = async (empId) => {
    try {
        const data = await axios.delete(`http://localhost:9090/app-api/workexperiences/${empId}`);
        return data;
    } catch (e) {
        console.log(e)
    }
}