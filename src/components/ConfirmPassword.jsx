import React, { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { useApi } from "../contexts/apiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { baseURL } from "../APIs/baseURL";
import Joi from "joi";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const ConfirmPassword = () => {
  const { token } = useParams();
  const [errorList, setErrorList] = useState([]);
  const { setToken, loading, editPartOfResource } = useApi();

  useEffect(() => {
    setToken(token);
    localStorage.setItem("token", token);
  }, []);
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  function validateLoginForm() {
    const schema = Joi.object({
      newPassword: Joi.string().min(8).required(),
      confirmPassword: Joi.string()
        .valid(Joi.ref("newPassword"))
        .required()
        .messages({
          "any.only": "Passwords do not match",
        }),
    });
    return schema.validate(password, { abortEarly: false });
  }

  const notify = (msg) => toast(msg);
  let navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const validation = validateLoginForm();
    if (validation.error) {
      setErrorList(validation.error.details);
    } else {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken && decodedToken.id) {
          const { id } = decodedToken;

          const res = await editPartOfResource(
            id,
            { password: password?.newPassword },
            `${baseURL}users/`
          );
          localStorage.removeItem("token");
          console.log(res);
          if (res?.message === "success") {
            notify(t("success-rest-password-message"));

            navigate("/signin");
          } else {
            notify(t("error-rest-password-message"));
          }
          setErrorList([]);
          setPassword({ newPassword: "", confirmPassword: "" });
        }
      } catch (error) {
        notify(t("error-rest-password-message"));
        setErrorList([]);
        setPassword({ newPassword: "", confirmPassword: "" });
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

  return (
    <div className="container">
      <ToastContainer />
      <div className="row d-flex justify-content-center my-5">
        <form
          onSubmit={submitForm}
          className="col-md-5 col-sm-7 col-9 d-flex flex-column"
        >
          <div className="form-outline mb-4">
            <input
              type="password"
              className="form-control rounded-0 border-0 border-bottom border-black-50 mb-3"
              id="newPassword"
              name="newPassword"
              value={password.newPassword}
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
            />
            <label className="form-label" htmlFor="newPassword">
              <Trans i18nKey="new-password"></Trans>
            </label>
            {renderError("newPassword")}
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              className="form-control rounded-0 border-0 border-bottom border-black-50 mb-3"
              id="confirmPassword"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={(e) =>
                setPassword({ ...password, confirmPassword: e.target.value })
              }
            />
            <label className="form-label" htmlFor="confirmPassword">
              <Trans i18nKey="confirm-password"></Trans>
            </label>
            {renderError("confirmPassword")}
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="request-btn text-white col-4 mb-5">
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <Trans i18nKey="confirming"></Trans>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
