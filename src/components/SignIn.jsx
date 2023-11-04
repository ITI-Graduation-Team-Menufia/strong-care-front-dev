import React, { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Joi from "joi";
import { useApi } from "../contexts/apiContext";
import { baseURL } from "../APIs/baseURL";
import { navigateTo } from "../utils/navigateTo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

export const SignIn = () => {
  const {
    setToken,
    loading,
    createResource,
    setLoggedUserData,
    getResource,
    setBaseUrl,
  } = useApi();
  let navigate = useNavigate();

  const [errorList, setErrorList] = useState([]);
  const [user, setUser] = useState({ email: "", password: "" });

  useEffect(() => {
    setBaseUrl(`${baseURL}auth/signin`);
    let token = localStorage.getItem("token");

    if (token) {
      let decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.id) {
        navigate(navigateTo(decodedToken));
      }
    }
  }, []);

  const notify = (msg) => toast(msg);

  function validateLoginForm() {
    let schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),

      password: Joi.string().min(8).required(),
    });
    return schema.validate(user, { abortEarly: false });
  }

  let login = async (e) => {
    e.preventDefault();
    let validation = validateLoginForm();
    if (validation.error) {
      setErrorList(validation.error.details);
    } else {
      try {
        let res = await createResource(user);
        if (res.message === "success") {
          localStorage.setItem("token", res.token);
          setToken(res.token);

          let token = localStorage.getItem("token");
          let decodedToken = jwtDecode(token);
          if (decodedToken && decodedToken.id) {
            let res = await getResource(decodedToken.id, `${baseURL}users`);
            if (res) {
              setLoggedUserData(res?.data);
            }
            navigate(navigateTo(decodedToken));
          }
          notify(<Trans i18nKey="correct_credentials_message"></Trans>);
        } else {
          notify(<Trans i18nKey="incorrect_credentials_message"></Trans>);
          setUser({ email: "", password: "" });
        }
      } catch (error) {
        notify(<Trans i18nKey="incorrect_credentials_message"></Trans>);
        setUser({ email: "", password: "" });
      }
    }
  };

  const handleInputChange = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };
  const renderError = (fieldName) => {
    const error = errorList.find((item) => item.context.key === fieldName);
    if (error) {
      return (
        <div key={error.message} className="alert py-1 alert-danger">
          <Trans i18nKey={`error-${fieldName}-message`} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="my-5 p-5">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row d-flex justify-content-center my-5">
          <form
            onSubmit={login}
            className="col-md-5 col-sm-7 col-9 d-flex flex-column"
          >
            <div className="form-outline mb-4">
              <input
                type="text"
                className="form-control rounded-0 border-0 border-bottom border-black-50 mb-3"
                id="form2Example1"
                name="email"
                value={user?.email}
                onChange={handleInputChange}
              />
              <label className="form-label" htmlFor="form2Example1">
                <Trans i18nKey="email"></Trans>
              </label>
              {renderError("email")}
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                className="form-control rounded-0 border-0 border-bottom border-black-50 mb-3"
                id="form2Example2"
                name="password"
                value={user?.password}
                onChange={handleInputChange}
              />
              <label className="form-label" htmlFor="form2Example2">
                <Trans i18nKey="password"></Trans>
              </label>
            </div>
            {renderError("password")}
            <div className="row mb-4">
              <div className="col text-end">
                <Link to="/forgetpassword">
                  <Trans i18nKey="forget-password"></Trans>
                </Link>
              </div>
            </div>
            <div className="text-center mt-3">
              <button className="request-btn text-white col-4 mb-5">
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  <Trans i18nKey="sign-in"></Trans>
                )}
              </button>
              <p className="text-dark">
                <Trans i18nKey="not-member"></Trans>
                <b></b>
                <Link to="/signup">
                  <Trans i18nKey="register"></Trans>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
