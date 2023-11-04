import logo from "../../../assets/images/logo.png";
import { Trans } from "react-i18next";
import { useApi } from "../../../contexts/apiContext";
import i18next from "i18next";
import DEFAULT_IMAGE_PROFILE from "../../../assets/images/dashboard/noavatar.png";
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react'

export default function Navbar() {
  const { loggedUserData, setToken, setLoggedUserData } = useApi();

// LOGOUT
let navigate = useNavigate();

let logout = () => {
  localStorage.removeItem("token");
  setToken(null);
  navigate("/");

  setLoggedUserData(null);
};

useEffect(()=>{
  console.log(loggedUserData);
},[loggedUserData])


  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ backgroundColor: "red" }}
    >
      <div className="container fw-bold">
        <span className="navbar-brand">
          <img src={logo} alt="Bootstrap" width="70" />
          <span>
            <Trans i18nKey="admin-dashboard"></Trans>
          </span>
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ">
          {loggedUserData && (
            <li className="nav-item">
              <span className="nav-link">
                <img
                  src={loggedUserData?.profileImg?.url || DEFAULT_IMAGE_PROFILE}
                  alt=""
                  className="rounded-circle "
                  style={{ width: "50px", height: "50px", margin: "0 10px" }}
                />
                {!loggedUserData && (
                  <p class="placeholder-wave">
                    <span class="placeholder col-12"></span>
                  </p>
                )}
                {loggedUserData && (
                  <span>
                    {loggedUserData?.firstName + " " + loggedUserData?.lastName}
                  </span>
                )}
              </span>
            </li>)}
            {/* LOGOUT */}
            {loggedUserData && (
              <li className="nav-item">
                <button onClick={logout} className="nav-link">
                  <span>
                    <Trans i18nKey="logout"> </Trans>
                  </span>
                </button>
              </li>
            )}
            {/* Language Switcher */}
            <li className="nav-item d-flex">
              <select
                value={localStorage.getItem("lng") || "ar"}
                className="nav-link border border-0 align-self-center selectpicker"
                onChange={(e) => {
                  localStorage.setItem("lng", e.target.value);
                  i18next.changeLanguage(e.target.value);
                }}
              >
                <option value="en">
                  <Trans i18nKey="english"> </Trans>
                </option>
                <option value="ar">
                  <Trans i18nKey="arabic"> </Trans>
                </option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
