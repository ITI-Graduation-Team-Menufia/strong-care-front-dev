import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Trans } from "react-i18next";
import { useApi } from "../../../contexts/apiContext";
import { baseURL } from "../../../APIs/baseURL";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getInTouch from "../../../assets/images/dashboard/getInTouche.jpg";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "../../../components/shared/Spinner";

const notify = (msg) => toast(msg);

export function Contract() {
  const { getResource, loading, editPartOfResource } = useApi();
  const [contractData, setContractData] = useState({});
  const [approvalState, setApprovalState] = useState(false);
  const [emailData, setEmailData] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmailData({ ...emailData, [name]: value });
  };

  let { id } = useParams();

  useEffect(() => {
    let fetch = async () => {
      try {
        let response = await getResource(id, `${baseURL}insuranceRequest`);
        setContractData(response?.data);
        console.log(response?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const sendApprovalState = async (state) => {
    console.log(emailData);
    let emailDataTemp;
    if (state) {
      emailDataTemp = {
        state: "approved",
        to: contractData?.clientEmail,
        subject: "تم قبول عقد الضمان",
        message: emailData?.message,
        fileLink: emailData?.fileLink,
      };
    } else {
      emailDataTemp = {
        state: "rejected",
        to: contractData?.clientEmail,
        subject: "تم رفض عقد الضمان",
        message: emailData?.message,
        fileLink: emailData?.fileLink,
      };
    }
    let res = await editPartOfResource(
      id,
      emailDataTemp,
      `${baseURL}insuranceRequest`
    );
    if (res?.message === "success") {
      if(res.data.state === 'approved')
      notify(<Trans i18nKey="warranty-request-approved"/>);
      else
      notify(<Trans i18nKey="warranty-request-rejected"></Trans>);
    } else {
      notify(<Trans i18nKey="compensation-request-message-error"></Trans>);
    }
  };

  return (
    <div className="company w-100 mt-2 px-3">
      <ToastContainer/>
      <h2 className="text-center">
        <Trans i18nKey="warranty-request-details" />
      </h2>
      {loading && <div className="text-center"><Spinner/></div>}
      {!loading && 
        <div className="w-75 mx-auto d-flex flex-column mt-5 gap-2">
          {/* Client Name */}
          <div className="form-group">
            <label>
              <Trans i18nKey="client-name" />
            </label>
            <input
              name=""
              disabled
              type="text"
              className="form-control"
              value={contractData?.clientName}
            />
          </div>
          {/* Client Email */}
          <div className="form-group">
            <label>
              <Trans i18nKey="client-email" />
            </label>
            <input
              name=""
              disabled
              type="text"
              className="form-control"
              value={contractData?.clientEmail}
            />
          </div>
          {/* Client Phone */}
          <div className="form-group">
            <label>
              <Trans i18nKey="client-phone" />
            </label>
            <input
              name=""
              disabled
              type="text"
              className="form-control"
              value={contractData?.clientPhone}
            />
          </div>
          {/* Company */}
          <div className="form-group">
            <label>
              <Trans i18nKey="company" />
            </label>
            <input
              name=""
              disabled
              type="text"
              className="form-control"
              value={contractData?.company?.legalName}
            />
          </div>
          {/* Device Brand */}
          <div className="form-group">
            <label>
              <Trans i18nKey="device-brand" />
            </label>
            <input
              name=""
              disabled
              type="text"
              className="form-control"
              value={contractData?.deviceBrand}
            />
          </div>
          {/* Device Color */}
          <div className="form-group">
            <label>
              <Trans i18nKey="device-color" />
            </label>
            <input
              name=""
              disabled
              type="text"
              className="form-control"
              value={contractData?.deviceColor}
            />
          </div>
          {/* Device Model */}
          <div className="form-group">
            <label>
              <Trans i18nKey="device-model" />
            </label>
            <input
              name=""
              disabled
              type="text"
              className="form-control"
              value={contractData?.deviceModel}
            />
          </div>
          {/* Device Type */}
          <div className="form-group">
            <label>
              <Trans i18nKey="device-type" />
            </label>
            <input
              name=""
              disabled
              type="text"
              className="form-control"
              value={contractData?.deviceType}
            />
          </div>
          {/* Warranty Duration */}
          <div className="form-group">
            <label>
              <Trans i18nKey="warranty-duration" />
            </label>
            <input
              name=""
              disabled
              type="text"
              className="form-control"
              value={contractData?.insuranceDuration}
            />
          </div>
          {/* serial No */}
          <div className="form-group">
            <label>
              <Trans i18nKey="device-serial-number" />
            </label>
            <input
              name=""
              disabled
              type="text"
              className="form-control"
              value={contractData?.serialNo}
            />
          </div>
          {/* insurance No */}
          <div className="form-group">
            <label>
              <Trans i18nKey="warranty-number" />
            </label>
            <input
              name=""
              disabled
              type="text"
              className="form-control"
              value={contractData?.insuranceNo}
            />
          </div>

          <div className="d-flex flex-sm-row flex-column justify-content-center gap-2 m-3">
            <button
              className="btn btn-success fs-6"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                setApprovalState(true);

                setEmailData({
                  message: "تم قبول طلب إنشاء عقد الضمان خاصتكم",
                  fileLink: "https://www.africau.edu/images/default/sample.pdf",
                });
              }}
            >
              <Trans i18nKey="approve-request" />
            </button>
            <button
              className="btn btn-danger fs-6"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                setApprovalState(false);
                setEmailData({
                  message: "تم  رفض طلب إنشاء عقد الضمان خاصتكم",
                });
              }}
            >
              <Trans i18nKey="reject-request" />
            </button>
          </div>
        </div>
      }
      {/* APPROVAL MODAL */}
      <div
        class="modal modal-xl"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title fs-5 text-primary mx-auto"
                id="exampleModalLabel"
              >
                أرسل بريد إلكتروني
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* MODAL BODY */}
              <div className="container bg-light-subtle d-flex flex-column flex-md-row mb-3 justify-content-center align-items-center">
                <div className="m-5 text-center">
                  <img src={getInTouch} alt="g" width="400" />
                </div>
                <div className="details vw-75">
                  <h3 className="text-start">{t("contact-us")}</h3>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="addon-wrapping">
                      <FontAwesomeIcon icon="fa-solid fa-user" />
                    </span>
                    <input
                      type="text"
                      disabled
                      value={contractData?.clientName}
                      className="form-control"
                      placeholder={t("name")}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="addon-wrapping">
                      <FontAwesomeIcon icon="fa-solid fa-envelope" />
                    </span>

                    <input
                      disabled
                      value={contractData?.clientEmail}
                      type="text"
                      className="form-control"
                      placeholder={t("email")}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{ height: "100px" }}
                      onChange={handleInputChange}
                      name="message"
                      value={emailData?.message}
                    ></textarea>
                    <label
                      htmlFor="floatingTextarea2"
                      className="text-secondary"
                    >
                      {t("message")}
                    </label>
                  </div>

                  {approvalState && (
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="addon-wrapping">
                        <FontAwesomeIcon icon="fa-solid fa-file" />
                      </span>
                      <input
                        onChange={handleInputChange}
                        name="fileLink"
                        value={emailData?.fileLink}
                        type="text"
                        className="form-control"
                        placeholder="link attached file"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary rounded-5"
                    onClick={() => {
                      sendApprovalState(approvalState);
                    }}
                    data-bs-dismiss="modal"
                  >
                    {loading ? (
                      <FontAwesomeIcon icon={faSpinner} spin />
                    ) :
                      t("send")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END OF APPROVAL MODAL */}
    </div>
  );
}
