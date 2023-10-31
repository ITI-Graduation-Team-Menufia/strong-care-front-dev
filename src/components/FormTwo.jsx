import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import SignupProgressBar from "./SignupProgressBar";
import { CompanySchema } from "../models/company.validation";
import { useApi } from "../contexts/apiContext";
import { baseURL } from "../APIs/baseURL";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const FormTwo = () => {
  const { createResource, setBaseUrl} =
    useApi();

  let [id, setId] = useState(null);

  useEffect(() => {
    setBaseUrl(`${baseURL}users/company`);
    let token = localStorage.getItem("token");
    let decodedToken = jwtDecode(token);
    if (decodedToken && decodedToken.id) {
      const { id } = decodedToken;
      console.log(id);
      setId(id);
    }
  }, []);

  const { t } = useTranslation();
  const [values, setValues] = useState({});
  const [errorList, setErrorList] = useState([]);
  const navigate = useNavigate();

  const validateForm = () => {
    const { error } = CompanySchema.validate(values, { abortEarly: false });
    setErrorList(error ? error.details : []);
    if (error) {
      return false;
    }
    return true;
  };

  const [selectedCommercialRegisterImage, setSelectedCommercialRegisterImage] =
    useState(null);
  const [selectedIdentityImage, setSelectedIdentityImage] = useState(null);

  function handleFileChange(event, setterFunction) {
    const file = event.target.files[0];
    setterFunction(file);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submitForm = async (e) => {
    console.log("SUBMIT");

    e.preventDefault();

    if (!validateForm()) {
      console.log("VAILED TO VALIDATE");
      return;
    }

    const companyDataForm = new FormData();
    companyDataForm.append("country", values?.country);
    companyDataForm.append("noCommercialRegister", values?.noCommercialRegister);
    companyDataForm.append("commission", 20);
    companyDataForm.append("legalName", values?.legalName);
    companyDataForm.append("legalLocation", "companyData.legalName");
    companyDataForm.append(
      "commercialRegisterImg",
      selectedCommercialRegisterImage
    );
    companyDataForm.append("identityImg", selectedIdentityImage);
    companyDataForm.append("user", id);

    let res = await createResource(companyDataForm);
    if (res?.message === "success") {
      console.log("SEND TO BACK");

      // let response = await getResource(res?.data?._id);
      // if (response?.message === 'success'){
      //   setLoggedUserData(response?.data);
      // }

      navigate("/confirmationcode");
    }
  };

  return (
    <>
      <SignupProgressBar step={2} />
      <div className="container-fluid shadow p-3 mt-3 col-12 col-xxl-7 col-xl-7 col-lg-8 col-md-8 col-sm-10">
        <h2 className="fs-2 text-center my-4 primary-text">
          <Trans i18nKey="info"></Trans>
        </h2>
        <form className="d-flex flex-column" onSubmit={submitForm}>
          {/* COUNTRY */}
          <div className=" mb-4 m-auto w-75">
            <input
              type="text"
              id="validationServer01"
              name="country"
              className={`form-control ${
                errorList.some((error) => error?.context.key === "area")
                  ? "is-invalid"
                  : ""
              }rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("area")}
              onChange={handleInputChange}
            />
            {errorList.map(
              (error) =>
                error?.context.key === "area" && (
                  <div
                    key={error?.message}
                    className="invalid-feedback text-danger"
                  >
                    {error?.message}
                  </div>
                )
            )}
          </div>

          {/* COMMERCIAL REGISTER NO */}
          <div className=" mb-4 m-auto w-75">
            <input
              type="text"
              name="noCommercialRegister"
              className={`form-control ${
                errorList?.some((error) => error?.context.key === "recordsNum")
                  ? "is-invalid"
                  : ""
              } rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("records-num")}
              onChange={handleInputChange}
            />
            {errorList.map(
              (error) =>
                error?.context.key === "recordsNum" && (
                  <div
                    key={error.message}
                    className="invalid-feedback text-danger"
                  >
                    {error?.message}
                  </div>
                )
            )}
          </div>

          {/* LEGAL NAME */}
          <div className=" mb-4 m-auto w-75">
            <input
              type="text"
              name="legalName"
              id="validationServer03"
              placeholder={t("legal-name")}
              className={`form-control ${
                errorList?.some((error) => error?.context.key === "legalName")
                  ? "is-invalid"
                  : ""
              } rounded-0 border-0 border-bottom border-black-50 mb-3`}
              onChange={handleInputChange}
            />
            {errorList.map(
              (error) =>
                error?.context.key === "legalName" && (
                  <div
                    key={error?.message}
                    className="invalid-feedback text-danger"
                  >
                    {error?.message}
                  </div>
                )
            )}
          </div>

          {/* LEGAL LOCATION */}
          <div className=" mb-4 m-auto w-75">
            <input
              type="string"
              name="legalLocation"
              id="validationServer04"
              placeholder={t("legal-office")}
              className={`form-control ${
                errorList.some((error) => error?.context.key === "legalOffice")
                  ? "is-invalid"
                  : ""
              } rounded-0 border-0 border-bottom border-black-50 mb-3`}
              onChange={handleInputChange}
            />
            {errorList?.map(
              (error) =>
                error.context.key === "legalOffice" && (
                  <div
                    key={error?.message}
                    className="invalid-feedback text-danger"
                  >
                    {error?.message}
                  </div>
                )
            )}
          </div>
          {/* commercialRegisterImg */}
          <div className="form-group mb-4 m-auto w-75">
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
          {/* Identity Img */}
          <div className="form-group mb-4 m-auto w-75">
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
          {/* BUTTON */}
          <div className="m-auto text-white">
            <button className="btn btn-primary btn-lg" type="submit">
              <Trans i18nKey="continue"></Trans>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
