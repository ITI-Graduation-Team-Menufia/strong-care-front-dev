import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApi } from "../contexts/apiContext";
import { baseURL } from "../APIs/baseURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
export const Compensation = () => {
  const { createResource, getResource, loading } = useApi();
  const { t } = useTranslation();
  const [values, setValues] = useState({});
  const [errorList, setErrorList] = useState([]);
  const [compensation, setCompensation] = useState({});
  const [isClient, setIsClient] = useState(false);

  const [selectedMalfunctionImgs, setSelectedMalfunctionImgs] = useState([]);
  function handleFileChange(event) {
    const files = event.target.files;
    setSelectedMalfunctionImgs(files);
  }

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
    malfunctionImgs: Joi.required(),
  });

  const validateForm = (_validationSchema, data) => {
    const { error } = _validationSchema.validate(data, { abortEarly: false });
    setErrorList(error ? error.details : []);
    if (error) return false;
    return true;
  };
  const notifyFail = () => toast(<Trans i18nKey="message-warranty"></Trans>);
  const notify = (msg) => toast(msg);

  const submitForm = async (e) => {
    e.preventDefault();
    if (
      !validateForm(validationSchema, {
        descMalfunction: compensation?.descMalfunction,
        malfunctionImgs: selectedMalfunctionImgs,
      })
    )
      return;

    const compensationData = new FormData();
    compensationData.append("InsuranceRequestNo", values?.insuranceNo);
    compensationData.append("descMalfunction", compensation?.descMalfunction);
    for (const image of selectedMalfunctionImgs) {
      compensationData.append("malfunctionImgs", image);
    }
    let res = await createResource(compensationData, `${baseURL}compensation`);
    if (res?.message === "success") {
      notify(<Trans i18nKey="compensation-request-message"></Trans>);
      setIsClient(false);
    } else {
      notify(<Trans i18nKey="compensation-request-message-error"></Trans>);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const searchWarranty = async (e) => {
    e.preventDefault();
    if (!validateForm(searchValidationSchema, values)) return;
    let res = await getResource(
      values.InsuranceRequestNo,
      `${baseURL}insuranceRequest/insurance`
    );
    if (res?.message === "success") {
      setIsClient(true);
      setValues(res?.data);
    } else notifyFail();
  };
  return (
    <div className="container-fluid shadow p-3 mt-3 mb-3 col-12 col-xxl-7 col-xl-7 col-lg-8 col-md-8 col-sm-10">
      <ToastContainer />

      <h2 className="fs-2 text-center my-4 primary-text">
        <Trans i18nKey="compensation"></Trans>
      </h2>
      {isClient && (
        <form className="d-flex flex-column" onSubmit={submitForm}>
          <div className="my-1 d-flex  m-auto w-75">
            <label className="w-50">{t("client-name")}</label>

            <input
              type="text"
              name="clientName"
              disabled
              value={values?.clientName}
              className={`form-control rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("client-name")}
            />
          </div>
          <div className="my-1 d-flex m-auto w-75">
            <label className="w-50">{t("client-tel-num")}</label>
            <input
              type="text"
              name="clientPhone"
              className={`form-control rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("client-tel-num")}
              value={values?.clientPhone}
              disabled
            />
          </div>

          <div className="my-1 d-flex  m-auto w-75">
            <label className="w-50">{t("Warranty-number")}</label>

            <input
              type="text"
              name="InsuranceRequestNo"
              className={`form-control rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("Warranty-number")}
              value={values?.insuranceNo}
              disabled
            />
          </div>
          <div className="my-1 d-flex  m-auto w-75">
            <label className="w-50">{t("Warranty-owner")}</label>
            <input
              type="text"
              name="warrantyOwner"
              disabled
              className={`form-control rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("Warranty-owner")}
              value={values?.company?.legalName}
            />
          </div>

          <div className="my-1 d-flex  m-auto w-75">
            <label className="w-50">{t("device-model")}</label>
            <input
              type="text"
              name="deviceModel"
              className={`form-control rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("device-model")}
              disabled
              value={values?.deviceType}
            />
          </div>

          <div className="my-1 d-flex  m-auto w-75">
            <label className="w-50">{t("device-brand")}</label>
            <input
              type="text"
              className={`form-control rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("device-brand")}
              disabled
              value={values?.deviceBrand}
            />
          </div>

          <div className="my-1 d-flex  m-auto w-75">
            <label className="w-50">{t("device-serial-number")}</label>
            <input
              type="text"
              className={`form-control rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("device-serial-number")}
              disabled
              value={values?.serialNo}
            />
          </div>
          <div className="my-1 d-flex  m-auto w-75">
            <label className="w-50">{t("device-color")}</label>
            <input
              type="text"
              className={`form-control rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("device-color")}
              disabled
              value={values?.deviceColor}
            />
          </div>

          <div className="mb-4 m-auto w-75">
            <textarea
              type="text"
              name="descMalfunction"
              className={`form-control ${
                errorList.some(
                  (error) => error.context.key === "descMalfunction"
                )
                  ? "is-invalid"
                  : ""
              } rounded-0 border-0 border-bottom border-black-50 mb-3`}
              placeholder={t("damage")}
              onChange={(e) =>
                setCompensation({
                  ...compensation,
                  descMalfunction: e.target.value,
                })
              }
            />
            {errorList.map(
              (error) =>
                error.context.key === "descMalfunction" && (
                  <div
                    key={error.message}
                    className="invalid-feedback text-danger"
                  >
                    {<Trans i18nKey="error-message-descMalfunction"></Trans>}
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
              onChange={handleFileChange}
              className={`form-control ${
                errorList.some(
                  (error) => error.context.key === "malfunctionImgs"
                )
                  ? "is-invalid"
                  : ""
              } rounded-0  border border-black-50 mb-3`}
              id="validationServer02"
              placeholder={t("photo-of-damage")}
            />
            {errorList.map(
              (error) =>
                error.context.key === "malfunctionImgs" && (
                  <div
                    key={error.message}
                    className="invalid-feedback text-danger"
                  >
                    {<Trans i18nKey="error-message-malfunctionImgs"></Trans>}
                  </div>
                )
            )}
          </div>
          <div className="m-auto text-white">
            <button className="btn btn-primary btn-lg" type="submit">
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <Trans i18nKey="send-compensatio-request"></Trans>
              )}
            </button>
          </div>
        </form>
      )}
      {!isClient && (
        <form className="d-flex flex-column" onSubmit={searchWarranty}>
          <div className="my-1 d-flex  m-auto w-75">
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
                      ? `${t("please-enter")}${t(
                          "compensation-request-number"
                        )}`
                      : t("compensation-request-number-error-message")}
                  </div>
                )
            )}
          </div>
          <div className="m-auto text-white">
            <button className="btn btn-primary btn-lg" type="submit">
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <Trans i18nKey="search-compensatio-request"></Trans>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
