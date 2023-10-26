import React, { useEffect } from "react";
import check from "../assets/images/check.png";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function Review() {
  let navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/companyprofile");
    }, 3000);
  }, []);

  return (
    <div
      class="container d-flex justify-content-center align-items-center flex-column "
      style={{ display: "flex", height: "100vh" }}
    >
      <h2 class="mb-5">
        <Trans i18nKey="waiting-review1" values="ar">
          طلبك قيد المراجعة
        </Trans>
      </h2>
      <div class="row container d-flex justify-content-center align-items-center flex-column bg-light">
        <div class="col-md-4">
          <img src={check} alt="..." class="img-fluid" />
        </div>
        <div class="col-md-4">
          <p class="text-center">
            <Trans i18nKey="waiting-review2" values="ar"></Trans>
          </p>
        </div>
      </div>
    </div>
  );
}
