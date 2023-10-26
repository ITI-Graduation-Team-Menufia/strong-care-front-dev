import React, { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Joi from "joi";
import { useApi } from "../contexts/apiContext";
import { baseURL } from "../APIs/baseURL";
import { navigateTo } from "../utils/navigateTo";

export const SignIn = () => {
  const { setToken, loading, createResource, setBaseUrl } = useApi();
  let navigate = useNavigate();

  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setBaseUrl(`${baseURL}auth/signin`);
    let token = localStorage.getItem("token");
          
    if(token){
      let decodedToken = jwtDecode(token);
          if (decodedToken && decodedToken.id) {
            navigate(navigateTo(decodedToken))
          }
    }
  }, []);


  function validateLoginForm() {
    let schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),

      password: Joi.string().min(8),
    });
    return schema.validate(user, { abortEarly: false });
  }

  let login = async (e) => {
    e.preventDefault();
    let validation = validateLoginForm();
    if (validation.error) {
      setErrorList(validation.error.details);
    } else {
      try{
        let res = await createResource(user);
        if (res) {
          localStorage.setItem("token", res.token);
          setToken(res.token);
  
          let token = localStorage.getItem("token");
          let decodedToken = jwtDecode(token);
          if (decodedToken && decodedToken.id) {
            navigate(navigateTo(decodedToken))
          }
        }
      }catch(error){
        setError('Incorrect Email or password');
      }
    }
  }

  const handleInputChange = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  return (
    <div className="my-5 p-5">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center my-5">
          <form
            onSubmit={login}
            className="col-md-5 col-sm-7 col-9 d-flex flex-column"
          >
            {errorList.map((error) => (
              <div key={error.message} className="alert py-2 alert-danger">
                {error.message}
              </div>
            ))}
            {error ? <div className="alert  alert-danger">{error}</div> : ""}

            <div className="form-outline mb-4">
              <input
                type="email"
                className="form-control rounded-0 border-0 border-bottom border-black-50 mb-3"
                id="form2Example1"
                name="email"
                value={user?.email}
                onChange={handleInputChange}
                required
              />
              <label className="form-label" htmlFor="form2Example1">
                <Trans i18nKey="email"></Trans>
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                className="form-control rounded-0 border-0 border-bottom border-black-50 mb-3"
                id="form2Example2"
                name="password"
                value={user?.password}
                onChange={handleInputChange}
                required
              />
              <label className="form-label" htmlFor="form2Example2">
                <Trans i18nKey="password"></Trans>
              </label>
            </div>

            <div className="row mb-4">
              <div className="col d-flex justify-content-start align-items-center">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form2Example31"
                  />
                  <label className="form-check-label" htmlFor="form2Example31">
                    <Trans i18nKey="remember-me"></Trans>
                  </label>
                </div>
              </div>

              <div className="col text-end">
                <Link to="/forgetpassword">
                  <Trans i18nKey="forget-password"></Trans>
                </Link>
              </div>
            </div>

            <div className="text-center mt-3">
              <button
                className="request-btn text-white col-4 mb-5"
              >
                {loading ? (
                  "" // <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  <Trans i18nKey="sign-in"></Trans>
                )}
              </button>
              <p>
                <Trans i18nKey="not-member"></Trans>
                <b></b>
                <a href="#!">
                  {" "}
                  <Trans i18nKey="register"></Trans>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
