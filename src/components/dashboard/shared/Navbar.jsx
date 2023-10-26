import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/logo.png";
import { Trans } from "react-i18next";
import { useApi } from "../../../contexts/apiContext";
import i18next from "i18next";

export default function Navbar() {
  const { loggedUserData } = useApi();

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
            {/* Language Switcher */}
            {/* <li className="nav-item">
              <select className="selectpicker" data-width="fit"
              onChange={(e)=>{setLanguage(e.target.value); localStorage.setItem('lang', e.target.value)}}>
                <option data-content={<span className="flag-icon flag-icon-us"></span>} value='en'>English</option>
                <option data-content={<span className="flag-icon flag-icon-mx"></span>} value='ar'>Arabic</option>
              </select>
            </li> */}
            <li className="nav-item">
              <span className="nav-link">
                <img
                  src={loggedUserData?.profileImg?.url}
                  alt=""
                  className="rounded-circle "
                  style={{ width: "50px", height: "50px", margin: "0 10px" }}
                />
                <span>
                  {loggedUserData?.firstName + " " + loggedUserData?.lastName}
                </span>
              </span>
            </li>
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
