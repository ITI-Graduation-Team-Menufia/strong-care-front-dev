import Joi from "joi";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApi } from "../contexts/apiContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import { baseURL } from "../APIs/baseURL";

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [errorList, setErrorList] = useState([]);
  const { setToken, loading, editPartOfResource } = useApi();

  function validateLoginForm() {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
    });
    return schema.validate({ email }, { abortEarly: false });
  }
  const notify = (msg) => toast(msg);

  const submitForm = async (e) => {
    e.preventDefault();
    const validation = validateLoginForm();
    if (validation.error) {
      setErrorList(validation.error.details);
    } else {
      try {
        const res = await editPartOfResource(
          "",
          { email },
          `${baseURL}auth/resetpassword`
        );

        if (res?.message === "success") {
          notify(t("success-send-rest-mail"));
        } else {
          notify(t("error-email-message"));
        }
        setErrorList(null);
        setEmail("");
      } catch (error) {
        notify(t("error-email-message"));
        setErrorList(null);
        setEmail("");
      }
    }
  };

  const renderError = (fieldName) => {
    const error = errorList?.find((item) => item.context.key === fieldName);
    if (error) {
      return (
        <div key={error.message} className="alert py-1 alert-danger">
          {t(`error-${fieldName}-message`)}
        </div>
      );
    }
    return null;
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="container">
      <ToastContainer />

      <div className="row d-flex justify-content-center my-5">
        <h5 className="text-center mb-5">{t("forgetten-password")}</h5>
        <form
          onSubmit={submitForm}
          className="col-md-5 col-sm-7 col-9 d-flex flex-column"
        >
          <div className="form-outline mb-4">
            <input
              type="email"
              className="form-control rounded-0 border-0 border-bottom border-black-50 mb-3"
              id="form2Example1"
              value={email}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="form2Example1">
              {t("email")}
            </label>
            {renderError("email")}
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="request-btn text-white col-4 mb-5">
              {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : t("send")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
