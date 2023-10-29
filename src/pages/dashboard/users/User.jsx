import React, { useEffect, useState, useRef } from "react";
import { Trans } from "react-i18next";
import { useParams } from "react-router-dom";
import { useApi } from "../../../contexts/apiContext";
import { baseURL } from "../../../APIs/baseURL";
import defaultProfilePic from "../../../assets/images/dashboard/profile-pic.jpg";
import "./User.scss";
import {
  userِAddSchema,
  userِEditSchema,
} from "../../../models/user.validation";
import Map from "../../../components/Map";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User() {
  const { getResource, updateResource, createResource, loading } = useApi();

  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorList, setErrorList] = useState([]);
  const [userData, setUserData] = useState({});

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id !== "add") {
      getResource(id, `${baseURL}users/`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  let [base64, setBase64] = useState();
  function handleFileChange(event) {
    const file = event.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64(reader.result);
    };
  }
  // MAP CODE

  const [chosenLocation, setChosenLocation] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleCoordinatesChange = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    console.log(lat, lng);
  };

  const handleMapClick = (e) => {
    setChosenLocation(e.latlng);
  };

  // END OF MAP CODE
  const validateUserData = (data, schema) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      setErrorList(error.details);
      return false;
    }
    return true;
  };
  let message = (msg) => {
    toast(msg);
  };

  const handleSave = async () => {
    let isValidData;
    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    if (selectedImage) formData.append("profileImg", selectedImage);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("role", userData.role);

    if (id === "add") {
      formData.append("phone", userData.phone);
      formData.append("email", userData.email);
      formData.append("password", userData.password);

      isValidData = validateUserData(userData, userِAddSchema);
    }
    isValidData = validateUserData(
      { firstName: userData.firstName, lastName: userData.lastName },
      userِEditSchema
    );

    if (!isValidData) return;
    try {
      if (id === "add") {
        let res = await createResource(formData, `${baseURL}users/addAdmin`);
        if (res?.message == "success") {
          message("تم إضافة المستخدم بنجاح!");
          setUserData({});
        }
      } else {
        let res = await updateResource(id, formData, `${baseURL}users/`);
        if (res?.message == "success") {
          message("تم تحديث بيانات المستخدم بنجاح!");
        }
      }
    } catch (error) {
      message("حدثت مشكله حاول مره اخري!");
    }
  };

  return (
    <div className="user w-100 mt-2 px-3">
      <h2 className="text-center">
        <ToastContainer />

        {id === "add" ? (
          <Trans i18nKey="add-new-user" />
        ) : (
          <Trans i18nKey="user-details" />
        )}
      </h2>
      {!loading && (
        <div className="d-flex flex-column flex-sm-row mt-5 gap-2">
          <div className="d-flex flex-column col-12 col-sm-5 gap-3 align-items-center">
            <div className="image-container">
              <img
                src={base64 || userData.profileImg?.url || defaultProfilePic}
                alt="img"
                className="image rounded-circle"
              />
              <div className="edit-icon" onClick={handleEditClick}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
                <input
                  type="file"
                  id="file-input"
                  name="profileImg"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <h2>{`${userData.firstName || "New"} ${
              userData.lastName || "User"
            }`}</h2>
          </div>

          <div className="col-12 col-sm-5 d-flex flex-column gap-2">
            {errorList.map((error) => (
              <div key={error.message} className="alert alert-danger">
                {error.message}
              </div>
            ))}

            <div className="form-group">
              {/* {errorList.} */}
              <label>
                <Trans i18nKey="first-name" />
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="last-name" />
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
              />
            </div>
            {id === "add" && (
              <div className="form-group">
                <label>
                  <Trans i18nKey="password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  // disabled={id !== 'add'}
                />
              </div>
            )}
            <div className="form-group">
              <label>
                <Trans i18nKey="role" />
              </label>
              <select
                className="form-control"
                name="role"
                value={userData.role}
                onChange={handleInputChange}
              >
                <option disabled>
                  <Trans i18nKey="choose-role" />
                </option>
                {/* <option value={'individual'}>Individual</option> */}
                <option value="admin">
                  <Trans i18nKey="admin" />
                </option>
                <option value="compensationDepart">
                  <Trans i18nKey="compensations-dept" />
                </option>
                <option value="insuranceRequestsDepart">
                  <Trans i18nKey="requests-dept" />
                </option>
              </select>
            </div>
            {id === "add" && (
              <>
                <div className="form-group">
                  <label>
                    <Trans i18nKey="verified" />
                  </label>
                  <select
                    lect
                    className="form-control"
                    name="verified"
                    value={userData.verified}
                    onChange={handleInputChange}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <Trans i18nKey="verified-email" />
                  </label>
                  <select
                    className="form-control"
                    name="verifiedEmail"
                    value={userData.verifiedEmail}
                    onChange={handleInputChange}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <Trans i18nKey="verified-phone" />
                  </label>
                  <select
                    className="form-control"
                    name="verifiedPhone"
                    value={userData.verifiedPhone}
                    onChange={handleInputChange}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              </>
            )}
            <div className="form-group">
              <label>
                <Trans i18nKey="phone" />
              </label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="email" />
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="form-group">
         <label>Location:</label>
         <input
           type="text"
           className="form-control"
           name="location"
           value={user?.location || 'Location'}
           onChange={handleInputChange}
         />
         <p className='text-danger'>To be changed to a map </p>
       </div> */}
            {/* SHOWING USER PROFIEL IMG URL */}
            {/* <div className="form-group">
         <label>Profile Image:</label>
         <input
           type="text"
           className="form-control"
           name="profileImage"
           value={user.profileImg.url}
           onChange={handleInputChange}
         />
       </div> */}
            <Map
              onCoordinatesChange={handleCoordinatesChange}
              className="map"
              style={{ height: "250px" }}
              center={[
                userData?.location?.latitude || 24.774265,
                userData?.location?.longitude || 46.738586,
              ]}
              zoom={6}
              onClick={handleMapClick}
              chosenLocation={chosenLocation}
            />

            <button
              className="btn btn-success w-50 mt-2 align-self-center"
              onClick={handleSave}
            >
              {id === "add" ? (
                <Trans i18nKey="add" />
              ) : (
                <Trans i18nKey="save" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
