import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import Joi from "joi";
import { baseURL } from "../APIs/baseURL";
import { useApi } from "../contexts/apiContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Warranty() {
  const { createResource, setBaseUrl, loggedUserData, setToken } = useApi();
  const { t } = useTranslation();
  const [values, setValues] = useState({});
  const [errorList, setErrorList] = useState([]);

  useEffect(() => {
    setBaseUrl(`${baseURL}insuranceRequest`);
  }, []);
  const validationSchema = Joi.object({
    clientName: Joi.string()
      .required()
      .min(3)
      .description("Client name is required."),
    deviceBrand: Joi.string()
      .min(3)
      .required()
      .description("Device brand is required."),
    deviceModel: Joi.string()
      .min(3)
      .required()
      .description("Device Model is required."),
    deviceColor: Joi.string()
      .min(3)
      .required()
      .description("Device color is required."),
    serialNo: Joi.string()
      .regex(/^[A-Za-z0-9]{8,15}$/)
      .required()
      .description("Valid serial number is required."),
    clientPhone: Joi.string()
      .required()
      .description("Client phone number is required."),
    insuranceDuration: Joi.string()
      .valid("one", "two")
      .required()
      .description("Insurance duration is required."),
    deviceType: Joi.string()
      .required()
      .min(3)
      .description("Device type is required."),
    clientEmail: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .description("Client email"),
  });
  const notifySuccess = () => toast("تم إنشاء طلب الضمان بنجاح! تهانينا!");

  const validateForm = () => {
    const { error } = validationSchema.validate(values, { abortEarly: false });
    setErrorList(error ? error.details : []);
    if (error) return false;
    return true;
  };

  const submitForm = async (e) => {
    console.log(loggedUserData);
    e.preventDefault();
    if (!validateForm()) return;

    const res = await createResource({
      ...values,
      company: loggedUserData?._id,
    });
    if (res?.message === "success") notifySuccess();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div
      className="container-fluid shadow p-3 mt-3 col-12 col-xxl-7 col-xl-7 col-lg-8 col-md-8 col-sm-10"
    
    >
      <ToastContainer />

      <h2 className="fs-2 text-center my-4 primary-text">
        <Trans i18nKey="compensation"></Trans>
      </h2>
      <form className="d-flex flex-column" onSubmit={submitForm}>
        {/* client Name */}
        <div className="mb-4 m-auto w-75">
          <input
            type="text"
            name="clientName"
            className={`form-control ${
              errorList.some((error) => error.context.key === "clientName")
                ? "is-invalid"
                : ""
            } rounded-0 border-0 border-bottom border-black-50 mb-3`}
            id="validationServer01"
            placeholder={t("client-name")}
            onChange={handleInputChange}
          />
          {errorList.map(
            (error) =>
              error.context.key === "clientName" && (
                <div
                  key={error.message}
                  className="invalid-feedback text-danger"
                >
                  {error.message}
                </div>
              )
          )}
        </div>
        {/* Device Brand */}
        <div className="mb-4 m-auto w-75">
          <input
            type="text"
            name="deviceBrand"
            className={`form-control ${
              errorList.some((error) => error.context.key === "deviceBrand")
                ? "is-invalid"
                : ""
            } rounded-0 border-0 border-bottom border-black-50 mb-3`}
            id="validationServer01"
            placeholder={t("device-company")}
            onChange={handleInputChange}
          />
          {errorList.map(
            (error) =>
              error.context.key === "deviceBrand" && (
                <div
                  key={error.message}
                  className="invalid-feedback text-danger"
                >
                  {error.message}
                </div>
              )
          )}
        </div>

        {/* deviceType */}

        <div className="mb-4 m-auto w-75">
          <input
            type="text"
            name="deviceType"
            className={`form-control ${
              errorList.some((error) => error.context.key === "deviceType")
                ? "is-invalid"
                : ""
            } rounded-0 border-0 border-bottom border-black-50 mb-3`}
            id="validationServer01"
            placeholder={t("device-type")}
            onChange={handleInputChange}
          />
          {errorList.map(
            (error) =>
              error.context.key === "deviceType" && (
                <div
                  key={error.message}
                  className="invalid-feedback text-danger"
                >
                  {error.message}
                </div>
              )
          )}
        </div>
        {/*device Color  */}
        <div className="mb-4 m-auto w-75">
          <input
            type="text"
            name="deviceColor"
            className={`form-control ${
              errorList.some((error) => error.context.key === "deviceColor")
                ? "is-invalid"
                : ""
            } rounded-0 border-0 border-bottom border-black-50 mb-3`}
            placeholder={t("device-color")}
            id="validationServer01"
            onChange={handleInputChange}
          />
          {errorList.map(
            (error) =>
              error.context.key === "deviceColor" && (
                <div
                  key={error.message}
                  className="invalid-feedback text-danger"
                >
                  {error.message}
                </div>
              )
          )}
        </div>

        {/* serial No */}
        <div className="mb-4 m-auto w-75">
          <input
            type="text"
            name="serialNo"
            className={`form-control ${
              errorList.some((error) => error.context.key === "serialNo")
                ? "is-invalid"
                : ""
            } rounded-0 border-0 border-bottom border-black-50 mb-3`}
            placeholder={t("device-serial-number")}
            onChange={handleInputChange}
          />
          {errorList.map(
            (error) =>
              error.context.key === "serialNo" && (
                <div
                  key={error.message}
                  className="invalid-feedback text-danger"
                >
                  {error.message}
                </div>
              )
          )}
        </div>

        {/* client Phone */}
        <div className=" mb-4 m-auto w-75">
          <input
            type="text"
            name="clientPhone"
            className={`form-control ${
              errorList.some((error) => error.context.key === "clientPhone")
                ? "is-invalid"
                : ""
            } rounded-0 border-0 border-bottom border-black-50 mb-3`}
            placeholder={t("client-phone")}
            onChange={handleInputChange}
          />
          {errorList.map(
            (error) =>
              error.context.key === "clientPhone" && (
                <div
                  key={error.message}
                  className="invalid-feedback text-danger"
                >
                  {error.message}
                </div>
              )
          )}
        </div>

        <div className=" mb-4 m-auto w-75">
          <input
            type="text"
            name="clientEmail"
            className={`form-control ${
              errorList.some((error) => error.context.key === "clientEmail")
                ? "is-invalid"
                : ""
            } rounded-0 border-0 border-bottom border-black-50 mb-3`}
            placeholder={t("client-email")}
            onChange={handleInputChange}
          />
          {errorList.map(
            (error) =>
              error.context.key === "clientEmail" && (
                <div
                  key={error.message}
                  className="invalid-feedback text-danger"
                >
                  {error.message}
                </div>
              )
          )}
        </div>
        {/* device Model */}
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
        {/* insuranceDuration */}
        <div className=" mb-4 m-auto w-75">
          <select
            onChange={handleInputChange}
            className={`form-select ${
              errorList.some(
                (error) => error.context.key === "insuranceDuration"
              )
                ? "is-invalid"
                : ""
            } rounded-0 border-0 border-bottom border-black-50 mb-3`}
            name="insuranceDuration"
          >
            <option selected readOnly>
              <Trans i18nKey={"warranty-period"}></Trans>
            </option>
            <option value="one">
              <Trans i18nKey={"one-year"}></Trans>
            </option>
            <option value="two">
              <Trans i18nKey={"two-year"}></Trans>
            </option>
          </select>
          {errorList.map(
            (error) =>
              error.context.key === "insuranceDuration" && (
                <div
                  key={error.message}
                  className="invalid-feedback text-danger"
                >
                  {error.message}
                </div>
              )
          )}

          {/* <div className="invalid text-danger"><Trans i18nKey="please-enter"></Trans><Trans i18nKey="purchase-date"></Trans></div> */}
        </div>
        <div className=" mb-4 m-auto w-75">
          <input
            readOnly
            disabled
            type="text"
            className="form-control is-invalid rounded-0 border-0 border-bottom border-black-50 mb-3"
            id="validationServer02"
            required
            placeholder={loggedUserData?.identificationNo}
          />
          {/* <div className="invalid-feedback"><Trans i18nKey="please-enter"></Trans><Trans i18nKey="agent-identification-number"></Trans></div> */}
        </div>
        <div className=" mb-4 m-auto w-75">
          <input
            readOnly
            disabled
            type="text"
            className="form-control is-invalid rounded-0 border-0 border-bottom border-black-50 mb-3"
            id="validationServer02"
            required
            placeholder={loggedUserData?.legalName}
          />
          {/* <div className="invalid-feedback"><Trans i18nKey="please-enter"></Trans><Trans i18nKey="shop-name"></Trans> </div> */}
        </div>

        <div className="m-auto text-white">
          <button className="btn btn-primary btn-lg" type="submit">
            <Trans i18nKey="create"></Trans>
          </button>
        </div>
      </form>
    </div>
  );
}
