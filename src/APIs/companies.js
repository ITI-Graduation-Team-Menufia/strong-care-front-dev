import axios from "axios";
import { baseURL } from "./baseURL";

let url = `${baseURL}users/company/`;

let getAllCompanies = () => axios.get(url, {
    headers: {
        token: localStorage.getItem('token'),
    }
});
let getCompanyById = (companyId) => axios.get(`${url}${companyId}`);
let addNewCompany = (company) => axios.post(`${url}`, company);
let editCompany = (companyId, company) =>
    axios.put(`${url}/${companyId}`, company, {
        headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
        }
    })
let deleteCompany = (companyId) => axios.delete(`${url}/${companyId}`);
let changeCompanyState = (companyId, newState) => axios.patch(`${url}/${companyId}`, newState);


export {
    getAllCompanies,
    getCompanyById,
    addNewCompany,
    editCompany,
    deleteCompany,
    changeCompanyState
};