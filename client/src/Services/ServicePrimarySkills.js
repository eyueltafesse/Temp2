import { Identity } from "@mui/base";
import axios from "axios";

const URL_ROOT = "${REACT_APP_API_LOCAL}";
// api call gets primary skills for a user: David 
export const getPrimarySkills = async (empId) => {
    try {
        const data = await axios.get(`http://localhost:9090/app-api/primaryskills/${empId}`);
        return data
    } catch (e) {
        console.log(e);
    }
}
// api call adds primary skills for a user: David
export const addPrimarySkills = async (empId, primarySkills) => {
    try {
        const data = await axios.post(`http://localhost:9090/app-api/primaryskills/${empId}`, primarySkills)
        return data;
    } catch (e) {
        console.log(e)
    }
}
// api call deletes primarys skills for user: david
export const deletePrimarySkills = async (id) => {
    try {
        const data = await axios.delete(`http://localhost:9090/app-api/primaryskills/${id}`)
        return data;
    } catch (e) {
        console.log(e)
    }
}

