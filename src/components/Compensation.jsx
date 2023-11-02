import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApi } from "../contexts/apiContext";
import { baseURL } from "../APIs/baseURL";
export const Compensation = () => {
  const { createResource, getResource, baseUrl, loading } = useApi();
  const { t } = useTranslation();
  const [values, setValues] = useState({});
  const [errorList, setErrorList] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const searchValidationSchema = Joi.object({
    InsuranceRequestNo: Joi.string()
      .required()
      .min(10)
      .max(10)
      .description("Insurance request identification must be 10 characters."),
  });

  const validationSchema = Joi.object({
    descMalfunction: Joi.string()
      .min(30)
      .required()
      .description("description malfunction must be more than 30 characters."),
    malfunctionImgs: Joi.array()
      .items(
        Joi.object({
          originalname: Joi.string().required(), // You can add more constraints
          mimetype: Joi.string()
            .valid("image/jpeg", "image/png", "image/gif")
            .required(),
          size: Joi.number().max(5242880).required(), // Max size in bytes (5MB)
        })
      )
      .min(1)
      .max(8)
      .required(),
  });

  const validateForm = (_validationSchema) => {
    const { error } = _validationSchema.validate(values, { abortEarly: false });
    setErrorList(error ? error.details : []);
    if (error) return false;
    return true;
  };
  const notifyFail = () => toast("هذا الضمان غير موجود لدينا!");

  const submitForm = (e) => {
    e.preventDefault();
    if (!validateForm(validationSchema)) return;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const searchWarranty = async (e) => {
    e.preventDefault();
    if (!validateForm(searchValidationSchema)) return;
    let res = await getResource(
      values.InsuranceRequestNo,
      `${baseURL}insuranceRequest/insurance`
    );
    if (res?.message === "success") {
      setIsClient(true);
      setValues({ ...values });
    } else notifyFail();
  };
  return (
    <div
      className="container-fluid shadow p-3 mt-3 mb-3 col-12 col-xxl-7 col-xl-7 col-lg-8 col-md-8 col-sm-10"
      
    >
      <ToastContainer />

      <h2 className="fs-2 text-center my-4 primary-text">
        <Trans i18nKey="compensation"></Trans>
      </h2>
      {isClient && (
        <form className="d-flex flex-column" onSubmit={submitForm}>
          <div className="mb-4 m-auto w-75">
            <input
              type="text"
              name="name"
              className={`form-control ${
                errorList.some((error) => error.context.key === "name")
                  ? "is-invalid"
                  : ""
              } rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("client-name")}
              onChange={handleInputChange}
            />
            {errorList.map(
              (error) =>
                error.context.key === "name" && (
                  <div
                    key={error.message}
                    className="invalid-feedback text-danger"
                  >
                    {error.message}
                  </div>
                )
            )}
          </div>
          <div className="mb-4 m-auto w-75">
            <input
              type="text"
              name="phone"
              className={`form-control ${
                errorList.some((error) => error.context.key === "phone")
                  ? "is-invalid"
                  : ""
              } rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("client-tel-num")}
              onChange={handleInputChange}
            />
            {errorList.map(
              (error) =>
                error.context.key === "phone" && (
                  <div
                    key={error.message}
                    className="invalid-feedback text-danger"
                  >
                    {error.message}
                  </div>
                )
            )}
          </div>
          <div className="mb-4 m-auto w-75">
            <input
              type="text"
              name="InsuranceRequestNo"
              disabled
              className={`form-control rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("Warranty-number")}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 m-auto w-75">
            <input
              type="text"
              name="warrantyOwner"
              className={`form-control ${
                errorList.some((error) => error.context.key === "warrantyOwner")
                  ? "is-invalid"
                  : ""
              } rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("Warranty-owner")}
              onChange={handleInputChange}
            />
            {errorList.map(
              (error) =>
                error.context.key === "warrantyOwner" && (
                  <div
                    key={error.message}
                    className="invalid-feedback text-danger"
                  >
                    {error.message}
                  </div>
                )
            )}
          </div>
          <div className="mb-4 m-auto w-75">
            <input
              type="text"
              name="deviceModel"
              className={`form-control ${
                errorList.some((error) => error.context.key === "deviceModel")
                  ? "is-invalid"
                  : ""
              } rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("device-model")}
              onChange={handleInputChange}
            />
            {errorList.map(
              (error) =>
                error.context.key === "deviceModel" && (
                  <div
                    key={error.message}
                    className="invalid-feedback text-danger"
                  >
                    {error.message}
                  </div>
                )
            )}
          </div>
          <div className="mb-4 m-auto w-75">
            <input
              type="text"
              name="damage"
              className={`form-control ${
                errorList.some((error) => error.context.key === "damage")
                  ? "is-invalid"
                  : ""
              } rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("damage")}
              onChange={handleInputChange}
            />
            {errorList.map(
              (error) =>
                error.context.key === "damage" && (
                  <div
                    key={error.message}
                    className="invalid-feedback text-danger"
                  >
                    {error.message}
                  </div>
                )
            )}
          </div>
          <div className="mb-4 m-auto w-75">
            <input
              multiple
              type="file"
              name="photo"
              accept="image/*"
              className={`form-control ${
                errorList.some((error) => error.context.key === "photo")
                  ? "is-invalid"
                  : ""
              } rounded-0  border border-black-50 mb-3`}
              id="validationServer02"
              placeholder={t("photo-of-damage")}
              onChange={handleInputChange}
            />
            {errorList.map(
              (error) =>
                error.context.key === "photo" && (
                  <div
                    key={error.message}
                    className="invalid-feedback text-danger"
                  >
                    {error.message}
                  </div>
                )
            )}
          </div>
          <div className="m-auto text-white">
            <button className="btn btn-primary btn-lg" type="submit">
              <Trans i18nKey="send-compensatio-request"></Trans>
            </button>
          </div>
        </form>
      )}
      {!isClient && (
        <form className="d-flex flex-column" onSubmit={searchWarranty}>
          <div className="mb-4 m-auto w-75">
            <input
              type="text"
              name="InsuranceRequestNo"
              className={`form-control ${
                errorList.some(
                  (error) => error.context.key === "InsuranceRequestNo"
                )
                  ? "is-invalid"
                  : ""
              } rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("Warranty-number")}
              onChange={handleInputChange}
            />
            {errorList.map(
              (error) =>
                error.context.key === "InsuranceRequestNo" && (
                  <div
                    key={error.message}
                    className="invalid-feedback text-danger"
                  >
                    {error.type === "any.required"
                    ? `${t("please-enter")}${t("compensation-request-number")}`
                    : t('compensation-request-number-error-message')}   
                  </div>
                )
            )}
          </div>
          <div className="m-auto text-white">
            <button className="btn btn-primary btn-lg" type="submit">
              <Trans i18nKey="search-compensatio-request"></Trans>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
