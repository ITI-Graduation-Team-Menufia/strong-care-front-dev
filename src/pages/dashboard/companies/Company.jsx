import { useParams } from "react-router-dom";
import "./Company.scss";
import DEFAULT_PROFILE_IMAGE from "../../../assets/images/dashboard/profile-pic.jpg";
import React, { useState, useRef, useEffect } from "react";
import { Trans } from "react-i18next";
import { useApi } from "../../../contexts/apiContext";
import { baseURL } from "../../../APIs/baseURL";
import Map from "../../../components/Map";

export default function Company() {
  const { getResource, updateResource, createResource, loading } = useApi();
  // const [errorList, setErrorList] = useState([]);
  const [companyData, setCompanyData] = useState({});

  const [userId, setUserId] = useState(null);

  let { id } = useParams();
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
  useEffect(() => {
    let fetch = async () => {
      try {
        if (id !== "add") {
          let response = await getResource(id, `${baseURL}users/company`);
          setUserId(response.data?.user?._id);
          delete response.data?.user?._id;
          let data = { ...response.data, ...response.data?.user };
          delete data?.user;
          setCompanyData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const fileInputRef = useRef(null);
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedCommercialRegisterImage, setSelectedCommercialRegisterImage] =
    useState(null);
  const [selectedIdentityImage, setSelectedIdentityImage] = useState(null);

  let [base64, setBase64] = useState();
  function handleFileChange(event, setterFunction) {
    const file = event.target.files[0];
    setterFunction(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64(reader.result);
    };
  }
  const handleSave = async () => {
    const userData = new FormData();
    userData.append("lastName", companyData.lastName);
    if (selectedProfileImage)
      userData.append("profileImg", selectedProfileImage);
    userData.append("latitude", latitude); // For location, will come from maps api
    userData.append("longitude", longitude);

    if (id === "add") {
    userData.append("firstName", "شركة");
      userData.append("role", "company");
      userData.append("phone", companyData.phone);
      userData.append("email", companyData.email);
      userData.append("password", "defaultPassword");
    }

    const companyDataForm = new FormData();
    companyDataForm.append("country", companyData.country);
    if (id === "add") {
      companyDataForm.append(
        "noCommercialRegister",
        companyData.noCommercialRegister
      );
    }
    companyDataForm.append("commission", 20);
    companyDataForm.append("legalName", companyData.legalName);
    companyDataForm.append("legalLocation", companyData.legalLocation);

    if (selectedCommercialRegisterImage)
      companyDataForm.append(
        "commercialRegisterImg",
        selectedCommercialRegisterImage
      );
    if (selectedIdentityImage)
      companyDataForm.append("identityImg", selectedIdentityImage);

    // Send to BackEnd
    try {
      if (id === "add") {
        let res = await createResource(userData, `${baseURL}users/`);
        companyDataForm.append("user", res?.data._id);
        res = await createResource(companyDataForm, `${baseURL}users/company`);
      } else {
        let res = await updateResource(userId, userData, `${baseURL}users/`);
        res = await updateResource(
          id,
          companyDataForm,
          `${baseURL}users/company`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="company w-100 mt-2 px-3">
      <h2 className="text-center">
        {id === "add" ? (
          <Trans i18nKey="add-new-company" />
        ) : (
          <Trans i18nKey="company-details" />
        )}
      </h2>
      {!loading && (
        <div className="d-flex flex-column flex-sm-row mt-5 gap-2">
          <div className="d-flex flex-column col-12 col-sm-5 gap-3 align-items-center">
            <div className="image-container">
              <img
                src={
                  base64 ||
                  companyData?.profileImg?.url ||
                  DEFAULT_PROFILE_IMAGE
                }
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
                  onChange={(event) =>
                    handleFileChange(event, setSelectedProfileImage)
                  }
                />
              </div>
            </div>
            <h2>{`${companyData?.firstName || "New"} ${
              companyData?.lastName || "Company"
            }`}</h2>
          </div>
          <div className="col-12 col-sm-5 d-flex flex-column gap-2">
            {/* <div className="form-group">
              <label>
                <Trans i18nKey="first-name" />
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={companyData?.firstName}
                onChange={handleInputChange}
              />
            </div> */}
            <div className="form-group">
              <label>
                <Trans i18nKey="company-name" />
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={companyData?.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="verified" />
              </label>
              <select
                disabled
                className="form-control"
                name="verified"
                value={companyData?.verified}
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
                disabled
                className="form-control"
                name="verifiedEmail"
                value={companyData?.verifiedEmail}
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
                disabled
                className="form-control"
                name="verifiedPhone"
                value={companyData?.verifiedPhone}
                onChange={handleInputChange}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="phone" />
              </label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={companyData?.phone}
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
                value={companyData?.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="location" />
              </label>
              <Map
                onCoordinatesChange={handleCoordinatesChange}
                className="map"
                style={{ height: "250px" }}
                center={[
                  companyData?.location?.latitude || 24.7742,
                  companyData?.location?.longitude || 46.738586,
                ]}
                zoom={6}
                onClick={handleMapClick}
                chosenLocation={chosenLocation}
              />
            </div>

            <div className="form-group">
              <label>
                <Trans i18nKey="country" />
              </label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={companyData?.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="commercial-registeration-no" />
              </label>
              <input
                type="text"
                className="form-control"
                name="noCommercialRegister"
                value={companyData?.noCommercialRegister}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="legal-name" />
              </label>
              <input
                type="text"
                className="form-control"
                name="legalName"
                value={companyData?.legalName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="legal-office" />
              </label>
              <input
                type="text"
                className="form-control"
                name="legalLocation"
                value={companyData?.legalLocation}
                onChange={handleInputChange}
              />
            </div>

            {/* Commercial register image */}
            <div className="form-group">
              <label>
                <Trans i18nKey="commercial-registeration-img" />
              </label>
              <input
                type="file"
                id="file-input"
                name="commercialRegisterImg"
                accept="image/*"
                onChange={(event) =>
                  handleFileChange(event, setSelectedCommercialRegisterImage)
                }
                className="w-100"
              />
            </div>

            {id === "add" && (
              <div className="form-group">
                <label>State:</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={companyData?.state}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div className="form-group">
              <label>
                <Trans i18nKey="agent-identification-number" />
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                name="identificationNo"
                value={companyData?.identificationNo}
                onChange={handleInputChange}
              />
            </div>
            {/* Identity Img */}
            <div className="form-group">
              <label>
                <Trans i18nKey="identity-img" />
              </label>
              <input
                type="file"
                id="file-input"
                name="identityImg"
                accept="image/*"
                onChange={(event) =>
                  handleFileChange(event, setSelectedIdentityImage)
                }
                className="w-100"
              />
            </div>
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
