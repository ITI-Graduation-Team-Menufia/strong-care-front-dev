import axios from "axios";
import { baseURL } from "./baseURL";

let url = `${baseURL}users/`;

let getAllUsers = () => axios.get(url, {
  headers: {
    token: localStorage.getItem('token'),
  }
});

let getUserById = (userId) => axios.get(`${url}${userId}`);
let addNewUser = (user, role) => {
  console.log(role)
  if (role === 'admin' || role === 'compensation-depart' || role === 'requests-depart') {
    console.log('Adding an admin..');
    return axios.post(`${url}addAdmin`, user, {
      headers: {
        token: localStorage.getItem('token'),
      }
    });
  } else {
    console.log('Adding a user..');
    return axios.post(`${url}`, user, {
      headers: {
        token: localStorage.getItem('token'),
      }
    });
  }
}
let editUser = (userId, user) =>
  axios.put(`${url}/${userId}`, user, {
    headers: {
      'Content-Type': 'multipart/form-data', // Important for file uploads
    }
  })
let deleteUser = (userId) => axios.delete(`${url}/${userId}`, {
  headers: {
    token: localStorage.getItem('token'),
  }
});
let changeUserPassword = (userId, newPassword) => axios.patch(`${url}/${userId}`, newPassword);
let changeUserPhone = (userId, newPhone) => axios.patch(`${url}/changePhone/${userId}`, newPhone);


export {
  getAllUsers,
  getUserById,
  addNewUser,
  editUser,
  deleteUser,
  changeUserPassword,
  changeUserPhone
};