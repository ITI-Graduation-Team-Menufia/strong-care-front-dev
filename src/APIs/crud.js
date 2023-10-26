import axios from "axios";
import { baseURL } from "./baseURL";



let getAllRecords = (resourceName) => axios.get(`${baseURL}${resourceName}`, {
    headers: {
        token: localStorage.getItem('token'),
    }
});
let getRecordById = (resourceName, id) => axios.get(`${baseURL}${resourceName}/${id}`);
let addRecord = (resourceName, recordData) => axios.post(`${baseURL}${resourceName}`, recordData);
let editRecord = (resourceName, recordId, updatedRecord) =>
    axios.put(`${baseURL}${resourceName}/${recordId}`, updatedRecord, {
        headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
        }
    })
let deleteRecord = (resourceName, recordId) => axios.delete(`${baseURL}${resourceName}/${recordId}`);

export { getAllRecords, getRecordById, addRecord, editRecord, deleteRecord }