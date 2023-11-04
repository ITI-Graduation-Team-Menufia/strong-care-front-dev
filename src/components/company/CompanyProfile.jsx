import React, { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import company from "../../assets/images/company.png";
import { useApi } from "../../contexts/apiContext";
import jwtDecode from "jwt-decode";
import { baseURL } from "../../APIs/baseURL";
import "./CompanyProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../shared/Spinner";

export const CompanyProfile = () => {
  let [validId, setValidId] = useState(false);
  let [companyData, setCompanyData] = useState(null);
  let [contractFlag, setContractFlag] = useState(false);
  const [selectedContractImage, setSelectedContractImage] = useState(null);

  const { createResource, getResource, setBaseUrl, setLoggedUserData, loading } =
    useApi();

  useEffect(() => {
    setBaseUrl(`${baseURL}auth/loggeduserdata`);
    setValidId(true);
  }, []);

  useEffect(() => {
    let fetch = async () => {
      if (validId) {
        let token = localStorage.getItem("token");
        let decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.id) {
          const { id } = decodedToken;
          let res = await getResource(id);
          setCompanyData(res?.data);
          setLoggedUserData(res?.data);
          console.log(res);
        }
      }
    };
    fetch();
  }, [validId]);

  let [contractData, setContractData] = useState(null);
  useEffect(() => {
    let fetch = async () => {
      let res = await createResource(contractData);
      if (res) {
        console.log(res);
      }
    };
    fetch();
  }, [contractFlag]);

  function handleFileChange(event) {
    const file = event.target.files[0];
    setSelectedContractImage(file);
  }

  let sendContract = async () => {
    setBaseUrl(`${baseURL}users/company/contract`);
    setContractFlag(true);
    const contractDataForm = new FormData();
    contractDataForm.append("company", companyData?._id);
    contractDataForm.append("contractHardCopyFile", selectedContractImage);
    setContractData(contractDataForm);

  };

  let navigate = useNavigate();

  return (
    <div className="container my-5">
      {loading && <div className="text-center"><Spinner/></div>}
      {!loading && (<div className="d-flex flex-column gap-4">
        {/* INFO */}
        <div className="d-flex flex-md-row flex-column gap-3 align-items-center justify-content-evenly">
          {/* MAIN INFO */}
          <div className="col-md-4 col-12 d-flex gap-3 flex-column align-items-center justify-content-around">
            <h2 className="fw-bold text-center">
              {companyData?.legalName || <Trans i18nKey="company-name" />}
            </h2>
            <div className="position-relative">
              <img
                src={companyData?.user?.profileImg.url || company}
                className="rounded"
                alt="Company"
                style={{ width: "200px", height: "200px" }}
              />
              {/* <i
                className="bi bi-pencil position-absolute bg-light opacity-100 fs-3 rounded-5 "
                style={{
                  top: "83%",
                  left: "80%",
                  cursor: "pointer",
                  transform: "translate(-50%, -50%)",
                }}
              ></i> */}
            </div>
          </div>
          {/* FORM */}
          <form className="col-md-8 col-12 row justify-content-center align-items-center">
            {/* IDENTIFICATION NUMBER */}
            <div className="">
              <label
                for="inputIdentification"
                className="col-form-label fs-6 fw-bold"
              >
                <Trans i18nKey="identification-number"></Trans>
              </label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="inputIdentification"
                  value={companyData?.identificationNo}
                  disabled
                  readonly
                ></input>
              </div>
            </div>
            {/* COMPANY NAME */}
            <div className="">
              <label
                for="inputCompanyName"
                className="col-form-label fs-6 fw-bold"
              >
                <Trans i18nKey="company-name"></Trans>
              </label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="inputCompanyName"
                  value={companyData?.user?.lastName}
                  disabled
                  readonly
                ></input>
              </div>
            </div>
            {/* COMPANY EMAIL */}
            <div className="">
              <label
                for="inputtext"
                className="col-form-label fs-6 fw-bold"
              >
                <Trans i18nKey="company-mail"></Trans>
              </label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="inputtext"
                  value={companyData?.user?.email}
                  disabled
                  readonly
                ></input>
              </div>
            </div>

            {/* PHONE */}
            <div className="">
              <label
                for="inputMobile"
                className="col-form-label fs-6 fw-bold"
              >
                <Trans i18nKey="phone"></Trans>
              </label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="inputMobile"
                  value={companyData?.user?.phone}
                  disabled
                  readonly
                ></input>
              </div>
            </div>

            {/* COMMERCIAL REGISTER NUMBER */}
            <div className="">
              <label
                for="inputTradeLicense"
                className="col-form-label fs-6 fw-bold"
              >
                <Trans i18nKey="commercial-registration"></Trans>
              </label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="inputTradeLicense"
                  value={companyData?.noCommercialRegister}
                  disabled
                  readonly
                ></input>
              </div>
            </div>

            {/* COMMISSION */}
            <div className="">
            <label
                for="inputCommission"
                className="col-form-label fs-6 fw-bold"
              >
                <Trans i18nKey="commission-percentage"></Trans>
              </label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="inputCommission"
                  value={companyData?.commission}
                  disabled
                  readonly
                ></input>
              </div>     
            </div>
          </form>
        </div>

        {/* BUTTONS */}
        <div className="d-flex gap-4 flex-column flex-md-row justify-content-center mx-auto">
          <button
            className=" btn btn-primary fs-6 "
            disabled={companyData?.state !== "approved"}
            // to="/warranty"
            onClick={()=> navigate('/warranty')}
          >
            <Trans i18nKey="create-warranty-contract"></Trans>
          </button>
          <button
            className=" btn btn-primary fs-6"
            disabled={companyData?.state !== "approved"}
            onClick={()=> navigate('/warrantycontract')}
          >
            <Trans i18nKey="register-warranty-contracts"></Trans>
          </button>
        </div>
        {/* CONFIRMATION SECTION */}
        {/* {companyData?.state === "approved" && (
          <div className="mx-auto d-flex gap-4 flex-column py-4">
            <h5 className="text-success text-center ">
              <Trans i18nKey="reviewing"></Trans>
            </h5>

            <div className="d-flex gap-4 flex-column flex-md-row justify-content-center mx-auto">
              <input
                className="form-control form-control-lg mt-3"
                type="file"
                id="file-input"
                name="profileImg"
                accept=".pdf, image/*"
                onChange={handleFileChange}
              />
              <button
                className="btn btn-primary fs-6 mt-3"
                onClick={() => {
                  sendContract();
                }}
              >
                <Trans i18nKey="confirming"></Trans>
              </button>
            </div>
          </div>
        )} */}
        {companyData?.state === "rejected" && (
          <div className="alert alert-danger text-center">
            بياناتك غير صحيحه.. تواصل معنا
          </div>
        )}
      </div>)}    
    </div>
  );
};
