import React, { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useApi } from "../contexts/apiContext";
import { baseURL } from "../APIs/baseURL";
import "./FormOne.scss";
import defaultProfilePic from "../assets/images/dashboard/profile-pic.jpg";
import { userSchema } from "../models/user.validation";
import SignupProgressBar from "./SignupProgressBar";
import Map from "./Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";

export const FormOne = () => {
  const { createResource, setBaseUrl, setToken, loading } = useApi();
  const { t } = useTranslation();

  const [values, setValues] = useState({});
  const [errorList, setErrorList] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setBaseUrl(`${baseURL}auth/signup`);
  }, []);

  // MAP CODE

  const [showMap, setShowMap] = useState(false);
  const [chosenLocation, setChosenLocation] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleCoordinatesChange = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleMapClick = (e) => {
    setChosenLocation(e.latlng);
  };

  const handleButtonClick = () => {
    setShowMap(true);
  };

  // END OF MAP CODE

  const validateForm = () => {
    const { error } = userSchema.validate(values, { abortEarly: false });
    setErrorList(error ? error.details : []);
    if (error) {
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = new FormData();
    userData.append("firstName", "شركة");
    userData.append("lastName", values.lastName);
    userData.append("password", values.password);
    userData.append("profileImg", selectedProfileImage);
    userData.append("latitude", latitude);
    userData.append("longitude", longitude);
    userData.append("role", "company");
    userData.append("phone", values.phone);
    userData.append("email", values.email);

    let res = await createResource(userData);
    if (res?.message === "success") {
      setToken(res?.token);
      setSubmitted(true);
    }
  };

  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  // For Displaying image on upload
  let [base64, setBase64] = useState();
  function handleFileChange(event) {
    const file = event.target.files[0];
    setSelectedProfileImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64(reader.result);
    };
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <SignupProgressBar step={1} />
      {!submitted && (
        <div className="container-fluid shadow p-3 my-3 mb-3 col-12 col-xxl-7 col-xl-7 col-lg-8 col-md-8 col-sm-10">
          <h2 className="fs-2 text-center my-4 primary-text">
            <Trans i18nKey="info"></Trans>
          </h2>
          <form
            className="d-flex flex-column justify-content-center"
            onSubmit={submitForm}
          >
            {/* IMAGE */}
            <div className="image-container align-self-center mb-5">
              <img
                src={base64 || defaultProfilePic}
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
            {/* LAST NAME */}
            <div className="mb-4 m-auto w-75">
              <input
                type="text"
                id="validationServer01"
                name="lastName"
                className={`form-control ${errorList.some((error) => error.context.key === "lastName")
                    ? "is-invalid"
                    : ""
                  }rounded-0 border-0 border-bottom border-black-50 mb-3`}
                placeholder={t("company-name")}
                onChange={handleInputChange}
              />
              {errorList.map(
                (error) =>
                  error?.context.key === "lastName" && (
                    <div
                      key={error?.message}
                      className="invalid-feedback text-danger"
                    >
                      {error?.message}
                    </div>
                  )
              )}
            </div>
            {/* PHONE */}
            <div className=" mb-4 m-auto w-75">
              <input
                type="text"
                name="phone"
                className={`form-control ${errorList.some((error) => error.context.key === "phone")
                    ? "is-invalid"
                    : ""
                  } rounded-0 border-0 border-bottom border-black-50 mb-3`}
                placeholder={t("company-tel-num")}
                onChange={handleInputChange}
              />
              {errorList.map(
                (error) =>
                  error?.context.key === "phone" && (
                    <div
                      key={error?.message}
                      className="invalid-feedback text-danger"
                    >
                      {t("please-enter")} {t("company-phone")}

                    </div>
                  )
              )}
            </div>
            {/* EMAIL */}
            <div className=" mb-4 m-auto w-75">
              <input
                type="text"
                name="email"
                id="validationServer03"
                placeholder={t("company-email")}
                className={`form-control ${errorList.some((error) => error.context.key === "email")
                    ? "is-invalid"
                    : ""
                  } rounded-0 border-0 border-bottom border-black-50 mb-3`}
                onChange={handleInputChange}
              />
              {errorList.map(
                (error) =>
                  error?.context.key === "email" && (
                    <div
                      key={error?.message}
                      className="invalid-feedback text-danger"
                    >
                      {/* {error?.message} */}
                      {error.type === "any.required"
                        ? `${t("please-enter")}${t("company-email")}`
                        : t('email-error-message')}
                    </div>
                  )
              )}
            </div>

            {/* PASSWORD */}
            <div className=" mb-4 m-auto w-75">
              <input
                type="password"
                name="password"
                id="validationServer04"
                placeholder={t("password")}
                className={`form-control ${errorList.some((error) => error.context.key === "password")
                    ? "is-invalid"
                    : ""
                  } rounded-0 border-0 border-bottom border-black-50 mb-3`}
                onChange={handleInputChange}
              />
              {errorList.map(
                (error) =>
                  error?.context.key === "password" && (
                    <div
                      key={error?.message}
                      className="invalid-feedback text-danger"
                    >
                      {/* {error?.message} */}
                      {error.type === "any.required"
                        ? `${t("please-enter")}${t("password")}`
                        : t('password-error-message')}

                    </div>
                  )
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className=" mb-4 m-auto w-75">
              <input
                type="password"
                name="confirmPassword"
                id="validationServer05"
                placeholder={t("confirm-password")}
                className={`form-control ${errorList.some(
                  (error) => error.context.key === "confirmPassword"
                )
                    ? "is-invalid"
                    : ""
                  } rounded-0 border-0 border-bottom border-black-50 mb-3`}
                onChange={handleInputChange}
              />
              {errorList.map(
                (error) =>
                  error?.context.key === "confirmPassword" && (
                    <div
                      key={error?.message}
                      className="invalid-feedback text-danger "
                    >
                      {/* {error?.message} */}
                      {error.type === "any.required"
                        ? `${t("please")}${t("confirm-password")}`
                        : t('confirm-password-error-message')}
                    </div>
                  )
              )}
              <div className="mt-5">
                <label htmlFor=""><Trans i18nKey='location' /></label>
                <Map
                  onCoordinatesChange={handleCoordinatesChange}
                  className="map"
                  style={{ height: "250px" }}
                  center={[24.774265, 46.738586]}
                  zoom={6}
                  onClick={handleMapClick}
                  chosenLocation={chosenLocation}
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="m-auto text-white">

              <button className="btn btn-primary btn-lg" type="submit">
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) :
                  <Trans i18nKey="continue"></Trans>}
              </button>
            </div>
          </form>
        </div>
      )}
      {submitted && (
        <div>
          <p className="alert alert-warning display-6 text-center my-3">
            <Trans i18nKey="confirm-your-email" />
          </p>
        </div>
      )}
    </>
  );
};
