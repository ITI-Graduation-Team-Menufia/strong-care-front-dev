import { useParams } from "react-router-dom";
import "./Company.scss";
import DEFAULT_PROFILE_IMAGE from "../../../assets/images/dashboard/profile-pic.jpg";
import React, { useState, useRef, useEffect } from "react";
import { Trans } from "react-i18next";
import { useApi } from "../../../contexts/apiContext";
import { baseURL } from "../../../APIs/baseURL";

export function CompanyEdit() {
  let { id } = useParams();

  const { getResource, updateResource, setBaseUrl, baseUrl, loading } =
    useApi();
  const [errorList, setErrorList] = useState([]);
  const [isCompanyUserUpdated, setIsCompanyUserUpdated] = useState(false);

  const [companyData, setCompanyData] = useState({});
  const [companyFormData, setCompanyFormData] = useState(null);
  const [userDataToUpdate, setUserDataToUpdate] = useState(null);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setBaseUrl(`${baseURL}users/company`);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      let res = await getResource(id);
      setUserId(res?.data.user._id);
      delete res?.data?.user?._id;
      let data = { ...res.data, ...res.data?.user };
      delete data?.user;
      setCompanyData(data);
    };
    const fetch2 = async () => {
      updateResource(userId, userDataToUpdate);
    };
    if (baseUrl === `${baseURL}users/company`) {
      fetch();
    } else if (baseUrl === `${baseURL}users` && userId && userDataToUpdate) {
      fetch2();
    }
  }, [baseUrl, id]);

  useEffect(() => {
    if (userId && userDataToUpdate) {
      for (const entry of userDataToUpdate.entries()) {
        const [fieldName, fieldValue] = entry;
        console.log(`Field Name: ${fieldName}, Field Value: ${fieldValue}`);
      }
      updateResource(userId, userDataToUpdate);
    }
  }, [userId, userDataToUpdate]);
  useEffect(() => {
    if (
      companyFormData &&
      isCompanyUserUpdated &&
      baseUrl === `${baseURL}users/company`
    )
      updateResource(id, companyFormData);
  }, [isCompanyUserUpdated]);

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

  function handleFileChange(event, setterFunction) {
    const file = event.target.files[0];
    setterFunction(file);
  }

  const handleSave = async () => {
    const userData = new FormData();
    userData.append("firstName", "شركة");
    userData.append("lastName", companyData.lastName);
    userData.append("password", "defaultPassword");
    userData.append("profileImg", selectedProfileImage);
    userData.append("latitude", "88"); // For location, will come from maps api
    userData.append("longitude", "123");

    const companyDataForm = new FormData();
    companyDataForm.append("country", companyData.country);
    companyDataForm.append(
      "noCommercialRegister",
      companyData.noCommercialRegister
    );
    companyDataForm.append("commission", 20);
    companyDataForm.append("legalName", companyData.legalName);
    companyDataForm.append("legalLocation", "companyData.legalName");

    companyDataForm.append(
      "commercialRegisterImg",
      selectedCommercialRegisterImage
    );

    companyDataForm.append("identityImg", selectedIdentityImage);

    try {
      if (userId) {
        setBaseUrl(`${baseURL}users`);

        setUserDataToUpdate(userData);
        updateResource(userId, userData);
        setBaseUrl(`${baseURL}users/company`);
        setIsCompanyUserUpdated(true);
        setCompanyFormData(companyDataForm);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="company w-100 mt-2 px-3">
      <h2 className="text-center">
        <Trans i18nKey="company-details" />
      </h2>
      {!loading && (
        <div className="d-flex flex-column flex-sm-row mt-5 gap-2">
          <div className="d-flex flex-column col-12 col-sm-5 gap-3 align-items-center">
            <div className="image-container">
              <img
                src={companyData?.profileImg?.url || DEFAULT_PROFILE_IMAGE}
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
            {/* SHOWING COMPANY ID */}
            {/* <div className="form-group">
            <label>ID:</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={company.id}
              onChange={handleInputChange}
            />
          </div> */}
            {/* <div className="form-group">
            <label>User ID:</label>
            <input
              type="text"
              className="form-control"
              name="userId"
              value={company?.userId}
              onChange={handleInputChange}
            />
          </div> */}
            <div className="form-group">
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
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="last-name" />
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
              <input
                type="text"
                className="form-control"
                name="location"
                value={companyData?.location}
                onChange={handleInputChange}
              />
              <p className="text-danger">To be changed to a map </p>
            </div>
            {/* SHOWING COMPANY PROFILE IMG URL */}
            {/* <div className="form-group">
            <label>Profile Image:</label>
            <input
              type="text"
              className="form-control"
              name="profileImage"
              value={company.img}
              onChange={handleInputChange}
            />
          </div> */}
            {/* <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              className="form-control"
              name="role"
              value={company?.role}
              onChange={handleInputChange}
            />
          </div> */}
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
              <p className="text-danger">To be changed to a map </p>
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
            {/* //////////// */}
            {/* <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={company?.state}
              onChange={handleInputChange}
            />
          </div> */}
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
              <Trans i18nKey="save" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
