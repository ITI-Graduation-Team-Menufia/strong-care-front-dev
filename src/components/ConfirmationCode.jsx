import React from "react";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function ConfirmationCode() {
  let navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        className=" d-flex flex-column justify-content-center align-items-center center-item pt-5"
        style={{ width: "25rem", height: "30rem", margin: "auto" }}
      >
        <i
          className="fa-solid fa-unlock-keyhole w-100 "
          style={{ color: "#0d6efd", fontSize: "100px", height: "100px " }}
        ></i>
        <div className="card-body d-flex flex-column justify-content-start align-items-center w-100  mt-5">
          <h5 className="text-dark font-weight-bold">
            <Trans i18nKey="enterOTP" values="ar"></Trans>
          </h5>
          <input
            type="text"
            placeholder="code"
            class="w-700 rounded border border-secondary mt-3 p-2 "
            style={{ width: "25rem" }}
          />
          <button
            type="button"
            class="btn btn-lg mt-3"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
            onClick={() => {
              navigate("/review");
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
