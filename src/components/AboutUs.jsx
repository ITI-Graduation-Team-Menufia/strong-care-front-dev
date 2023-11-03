import React, { useEffect, useState } from "react";
import { Trans, withTranslation } from "react-i18next";
import aboutUs from "../assets/images/about.jpg";
import employee from "../assets/images/empoloyee.jpg";
import { NavLink } from "react-router-dom";

const AboutUs = () => {
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const content = [
    [
      <p className="fs-5 fw-semibold text-info">
        <Trans i18nKey="integrity"></Trans>
      </p>,
      <Trans i18nKey="integrity-description"></Trans>,
    ],
    [
      <p className="fs-5 fw-semibold text-info">
        <Trans i18nKey="performance"></Trans>
      </p>,
      <Trans i18nKey="performance-description"></Trans>,
    ],
    [
      <p className="fs-5 fw-semibold text-info">
        <Trans i18nKey="responsibility"></Trans>
      </p>,
      <Trans i18nKey="responsibility-description"></Trans>,
    ],
    [
      <p className="fs-5 fw-semibold text-info">
        <Trans i18nKey="commitments"></Trans>
      </p>,
      <Trans i18nKey="commitments-description"></Trans>,
    ],
    [
      <p className="fs-5 fw-semibold text-info">
        <Trans i18nKey="customers"></Trans>
      </p>,
      <Trans i18nKey="customers-description"></Trans>,
      <p className="fs-6 fw-semibold">
        <Trans i18nKey="we-are-committed-to"></Trans> :
      </p>,
      <ul>
        <li>
          <Trans i18nKey="customer-commitment-1"></Trans>
        </li>
        <li>
          <Trans i18nKey="customer-commitment-2"></Trans>
        </li>
        <li>
          <Trans i18nKey="customer-commitment-3"></Trans>
        </li>
        <li>
          <Trans i18nKey="customer-commitment-4"></Trans>
        </li>
        <li>
          <Trans i18nKey="customer-commitment-5"></Trans>
        </li>
        <li>
          <Trans i18nKey="customer-commitment-6"></Trans>
        </li>
        <li>
          <Trans i18nKey="customer-commitment-7"></Trans>
        </li>
      </ul>,
    ],
    [
      <p className="fs-5 fw-semibold text-info">
        <Trans i18nKey="Employees"></Trans>
      </p>,
      <Trans i18nKey="Employees-description"></Trans>,
      <p className="fs-6 fw-semibold">
        <Trans i18nKey="we-are-committed-to"></Trans> :
      </p>,
      <ul>
        <li>
          <Trans i18nKey="Employee-commitment-1"></Trans>
        </li>
        <li>
          <Trans i18nKey="Employee-commitment-2"></Trans>
        </li>
        <li>
          <Trans i18nKey="Employee-commitment-3"></Trans>
        </li>
        <li>
          <Trans i18nKey="Employee-commitment-4"></Trans>
        </li>
        <li>
          <Trans i18nKey="Employee-commitment-5"></Trans>
        </li>
        <li>
          <Trans i18nKey="Employee-commitment-6"></Trans>
        </li>
        <li>
          <Trans i18nKey="Employee-commitment-7"></Trans>
        </li>
      </ul>,
      <p className="fs-6 fw-semibold">
        <Trans i18nKey="rules-to-employee"></Trans> :
      </p>,
      <ul>
        <li>
          <Trans i18nKey="rule-1"></Trans>
        </li>
        <li>
          <Trans i18nKey="rule-2"></Trans>
        </li>
        <li>
          <Trans i18nKey="rule-3"></Trans>
        </li>
        <li>
          <Trans i18nKey="rule-4"></Trans>
        </li>
        <li>
          <Trans i18nKey="rule-5"></Trans>
        </li>
        <li>
          <Trans i18nKey="rule-6"></Trans>
        </li>
        <li>
          <Trans i18nKey="rule-7"></Trans>
        </li>
        <li>
          <Trans i18nKey="rule-8"></Trans>
        </li>
      </ul>,
    ],
    [
      <p className="fs-5 fw-semibold text-info">
        <Trans i18nKey="Regulators"></Trans>
      </p>,
      <Trans i18nKey="Regulators-description"></Trans>,
      <p className="fs-6 fw-semibold">
        <Trans i18nKey="we-are-committed-to"></Trans> :
      </p>,
      <ul>
        <li>
          <Trans i18nKey="Employee-commitment-1"></Trans>
        </li>
        <li>
          <Trans i18nKey="Employee-commitment-2"></Trans>
        </li>
        <li>
          <Trans i18nKey="Employee-commitment-3"></Trans>
        </li>
        <li>
          <Trans i18nKey="Employee-commitment-4"></Trans>
        </li>
        <li>
          <Trans i18nKey="Employee-commitment-5"></Trans>
        </li>
        <li>
          <Trans i18nKey="Employee-commitment-6"></Trans>
        </li>
        <li>
          <Trans i18nKey="Employee-commitment-7"></Trans>
        </li>
      </ul>,
    ],
    [
      <p className="fs-5 fw-semibold text-info">
        <Trans i18nKey="Shareholders"></Trans>
      </p>,
      <Trans i18nKey="Shareholders-description"></Trans>,
      <p className="fs-6 fw-semibold">
        <Trans i18nKey="we-are-committed-to"></Trans> :
      </p>,
      <ul>
        <li>
          <Trans i18nKey="Shareholders-commitment-1"></Trans>
        </li>
        <li>
          <Trans i18nKey="Shareholders-commitment-2"></Trans>
        </li>
        <li>
          <Trans i18nKey="Shareholders-commitment-3"></Trans>
        </li>
        <li>
          <Trans i18nKey="Shareholders-commitment-4"></Trans>
        </li>
        <li>
          <Trans i18nKey="Shareholders-commitment-5"></Trans>
        </li>
        <li>
          <Trans i18nKey="Shareholders-commitment-6"></Trans>
        </li>
        <li>
          <Trans i18nKey="Shareholders-commitment-7"></Trans>
        </li>
      </ul>,
    ],
  ];
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="container">
      <div className="d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
        <div className="about-us col-md-6 col-sm-12 col-12 align-center me-4 ms-2">
          <h1 className="my-4">
            {" "}
            <Trans i18nKey="about-company"></Trans>
          </h1>
          <p className="fs-5 fw-normal text-body">
            {" "}
            <Trans i18nKey="about-company-berif"></Trans>{" "}
          </p>
          <p className=" text-body">
            {" "}
            <small>
              {" "}
              <Trans i18nKey="about-company-description"></Trans>{" "}
            </small>
          </p>
        </div>
        <div className="img col-md-6 col-sm-12 col-12  m-auto">
          <img src={aboutUs} className="w-100 h-100" alt="" />
        </div>
      </div>

      <div className="overview mt-4 w-75 m-auto">
        <h2>
          <Trans i18nKey="company-overview"></Trans>
        </h2>
        <p className="text-body " style={{ textAlign: "justify" }}>
          <small>
            <Trans i18nKey="company-overview-description"></Trans>
          </small>
        </p>
        <h2>
          <Trans i18nKey="company-history"></Trans>
        </h2>
        <p className="text-body" style={{ textAlign: "justify" }}>
          <small>
            <Trans i18nKey="company-history-description"></Trans>
          </small>
        </p>
        <h2>
          <Trans i18nKey="what-we-offer"></Trans>
        </h2>
        <p className="text-body" style={{ textAlign: "justify" }}>
          <small>
            <Trans i18nKey="what-we-offer-description"></Trans>
          </small>
        </p>
      </div>
      <div className=" localization d-flex flex-lg-row flex-md-row flex-sm-column flex-column mt-5 ">
        <div className="about-us col-md-6 col-sm-12 col-12 align-center me-4 ms-2 m-auto">
          <h1 className="my-4">
            {" "}
            <Trans i18nKey="localization-jobs"></Trans>
          </h1>
          <p className=" text-body mb-2">
            {" "}
            <small>
              {" "}
              <Trans i18nKey="localization-jobs-description-1"></Trans>{" "}
            </small>
          </p>
          <p className=" text-body mb-2">
            {" "}
            <small>
              {" "}
              <Trans i18nKey="localization-jobs-description-2"></Trans>{" "}
            </small>
          </p>
          <p className=" text-body">
            {" "}
            <small>
              {" "}
              <Trans i18nKey="localization-jobs-description-3"></Trans>{" "}
            </small>
          </p>
        </div>
        <div className="img col-md-6 col-sm-12 col-12  m-auto">
          <img src={employee} className="w-100 h-100" alt="" />
        </div>
      </div>
      <div>
        <div className="d-flex flex-lg-row flex-md-row flex-sm-column flex-column mt-5 mb-3 col-lg-9 col-md-12 m-auto">
          {isSmallScreen ? (
            <select
              className="form-select fs-5 fs-sm-6 border py-3 px-4 w-75"
              value={activeContentIndex}
              onChange={(e) => setActiveContentIndex(parseInt(e.target.value))}
            >
              {content.map((item, index) => (
                <option key={index} value={index}>
                  {item[0]}{" "}
                  {/* Replace with the appropriate label for each option */}
                </option>
              ))}
            </select>
          ) : (
            <menu className="d-flex flex-column fs-5 fs-sm-6 border py-3 px-4">
              {content.map((item, index) => (
                <NavLink
                  key={index}
                  className={
                    activeContentIndex === index ? "active text-info" : ""
                  }
                  onClick={() => setActiveContentIndex(index)}
                >
                  {item[0]}
                </NavLink>
              ))}
            </menu>
          )}
          <div id="tab-content">
            <ul className="col-lg-10 col-12">
              {content[activeContentIndex].map((item) => (
                <div className="text-body" key={item}>
                  {item}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(AboutUs);
