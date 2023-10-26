import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./Footer.css";
import { t } from "i18next";

export default function Footer() {
  return (
    <div className="d-flex flex-column m-0">
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
        id="footer"
      >
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3 pt-5">
              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4 ">
                <h6 className="text-uppercase fw-bold mb-4">
                  {t("guarantees")}
                </h6>
                <p>{t("typesOfGuarantees")}</p>

                <h6 className="text-uppercase fw-bold mb-4">
                  {t("compensations")}
                </h6>
                <p>{t("typesOfCompensations")}</p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4 ">
                <h6 className="text-uppercase fw-bold mb-4">
                  {t("legalAffairs")}
                </h6>
                <p>{t("documents")}</p>
                <p>{t("privacyPolicy")}</p>
                <p>{t("securityAndProtection")}</p>
                <p>{t("termsOfUse")}</p>

                <h6 className="text-uppercase fw-bold mb-4">
                  {t("companies")}
                </h6>
                <p>{t("aboutCompanies")}</p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4 ">
                <h6 className="text-uppercase fw-bold mb-4">
                  {t("contactCenter")}
                </h6>
                <p>
                  <MDBIcon icon="phone" className="mx-3" /> {t("phoneNumber")}
                </p>

                <h6 className="text-uppercase fw-bold mb-4">
                  {t("mainBranch")}
                </h6>
                <p>{t("claims")}</p>
                <p>
                  <MDBIcon icon="envelope" className="mx-3" />
                  {"strongcare@gmail.com"}{" "}
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="mx-auto">
            <span className="me-4 text-reset">
              <MDBIcon fab icon="facebook-f" />
              {t("facebook")}
            </span>
            <span className="me-4 text-reset">
              <MDBIcon fab icon="twitter" />
              {t("twitter")}
            </span>
            <span className="me-4 text-reset">
              <MDBIcon fab icon="google" />
              {t("google")}
            </span>
            <span className="me-4 text-reset">
              <MDBIcon fab icon="instagram" />
              {t("instagram")}
            </span>
            <span className="me-4 text-reset">
              <MDBIcon fab icon="linkedin" />
              {t("linkedin")}
            </span>
            <span className="me-4 text-reset">
              <MDBIcon fab icon="github" />
              {t("github")}
            </span>
          </div>
        </section>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          {t("copyright")}
          <span className="text-reset fw-bold">{t("teamName")}</span>
        </div>
      </MDBFooter>
    </div>
  );
}
