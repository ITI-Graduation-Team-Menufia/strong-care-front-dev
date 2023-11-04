import { useParams } from "react-router-dom";
import DEFAULT_PROFILE_IMAGE from "../../../assets/images/dashboard/profile-pic.jpg";
import DEFAULT_DOCUMENT_IMAGE from "../../../assets/images/dashboard/noavatar.png";
import React, { useState, useEffect } from "react";
import { Trans } from "react-i18next";
import { useApi } from "../../../contexts/apiContext";
import { baseURL } from "../../../APIs/baseURL";
import Map from "../../../components/Map";
import REJECTED_IMAGE from "../../../assets/images/dashboard/approved.png";
import APPROVED_IMAGE from "../../../assets/images/dashboard/rejected.png";
export function PendingRegisteration() {
  const { getResource, loading, editPartOfResource } = useApi();
  // const [errorList, setErrorList] = useState([]);
  const [companyData, setCompanyData] = useState({});
  const [userId, setUserId] = useState(null);
  const [emailData, setEmailData] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    let fetch = async () => {
      try {
        let response = await getResource(id, `${baseURL}users/company`);
        setUserId(response.data?.user?._id);
        delete response.data?.user?._id;
        let data = { ...response.data, ...response.data?.user };
        delete data?.user;
        setCompanyData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  // MAP CODE

  const [chosenLocation, setChosenLocation] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [state, setState] = useState(false);

  const handleCoordinatesChange = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleMapClick = (e) => {
    setChosenLocation(e.latlng);
  };

  // END OF MAP CODE
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmailData({ ...emailData, [name]: value });
  };
  const sendEmail = async () => {
    console.log(emailData);
    let emailDataTemp;
    if (state) {
      emailDataTemp = {
        state: "approved",
        to: companyData?.email,
        subject: "تم قبول شركتكم",
        message: emailData?.message,
        fileLink: emailData?.fileLink,
      };
    } else {
      emailDataTemp = {
        state: "rejected",
        to: companyData?.email,
        subject: "تم رفض شركتكم",
        message: emailData?.message,
        fileLink: emailData?.fileLink,
      };
    }
    let res = await editPartOfResource(
      id,
      emailDataTemp,
      `${baseURL}users/company`
    );
  };

  return (
    <div className="company w-100 mt-2 px-3">
      <h2 className="text-center">
        <Trans i18nKey="registeration-request-details" />
      </h2>
      {!loading && (
        <div className="d-flex flex-column flex-sm-row mt-5 gap-2">
          <div className="d-flex flex-column col-12 col-sm-5 gap-3 align-items-center">
            <div className="image-container">
              <img
                src={companyData?.profileImg?.url || DEFAULT_PROFILE_IMAGE}
                alt="img"
                className="image rounded-circle"
              />
            </div>
            <h2>{`${companyData?.firstName || "New"} ${
              companyData?.lastName || "Company"
            }`}</h2>
          </div>
          <div className="col-12 col-sm-6 d-flex flex-column gap-2">
            <div className="form-group">
              <label>
                <Trans i18nKey="first-name" />
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                name="firstName"
                value={companyData?.firstName}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="last-name" />
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                name="lastName"
                value={companyData?.lastName}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="phone" />
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                name="phone"
                value={companyData?.phone}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="email" />
              </label>
              <input
                disabled
                type="email"
                className="form-control"
                name="email"
                value={companyData?.email}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="location" />
              </label>
              <Map
                onCoordinatesChange={handleCoordinatesChange}
                className="map"
                style={{ height: "250px" }}
                center={[
                  companyData?.location?.latitude || 0,
                  companyData?.location?.longitude || 0,
                ]}
                zoom={10}
                onClick={handleMapClick}
                chosenLocation={chosenLocation}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="country" />
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                name="country"
                value={companyData?.country}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="commercial-registeration-no" />
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                name="noCommercialRegister"
                value={companyData?.noCommercialRegister}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="legal-name" />
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                name="legalName"
                value={companyData?.legalName}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="legal-office" />
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                name="legalLocation"
                value={companyData?.legalLocation}
              />
            </div>
            {/* Commercial register image */}
            <div className="form-group">
              <label>
                <Trans i18nKey="agent-identification-number" />
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                name="identificationNo"
                value={companyData?.identificationNo}
              />
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="verified" />
              </label>
              <select
                disabled
                className="form-control"
                name="verified"
                value={companyData?.verified}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="verified-email" />
              </label>
              <select
                disabled
                className="form-control"
                name="verifiedEmail"
                value={companyData?.verifiedEmail}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="verified-phone" />
              </label>
              <select
                disabled
                className="form-control"
                name="verifiedPhone"
                value={companyData?.verifiedPhone}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <Trans i18nKey="state" />
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                name="state"
                value={companyData?.state}
              />
            </div>
            <div className="">
              <label>
                <Trans i18nKey="documents" />
              </label>
              <div className="w-100 d-flex flex-sm-row flex-column justify-content-evenly align-items-center">
                {/* Identity Img */}
                <div>
                  <p>
                    <Trans i18nKey="identity-img" />
                  </p>
                  <a href={companyData?.identityImg?.url} target="_top">
                    <img
                      src={
                        companyData?.identityImg?.url || DEFAULT_PROFILE_IMAGE
                      }
                      alt="img"
                      className="image rounded"
                    />
                  </a>
                </div>
                {/* Commercial Register Img */}
                <div>
                  <p>
                    <Trans i18nKey="commercial-registeration-img" />
                  </p>
                  <a
                    href={companyData?.commercialRegisterImg?.url}
                    target="_top"
                  >
                    <img
                      src={
                        companyData?.commercialRegisterImg?.url ||
                        DEFAULT_PROFILE_IMAGE
                      }
                      alt="img"
                      className="image rounded"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="d-flex flex-sm-row flex-column justify-content-center gap-2 m-3">
              <button
                onClick={() => {
                  setState(true);
                  setEmailData({
                    message:
                      " بعد استعراض بياناتكم والتحقق منها، يسرنا أن نعلمكم أنكم الآن جاهزون لإنشاء عقود الضمان لعملائكم.  لإتمام العملية، نحتاج فقط إلى توقيع العقد المرفق ورفعه لنا مرة أخرى من صفحتكم الشخصية على موقعنا",
                    fileLink:
                      "https://www.africau.edu/images/default/sample.pdf",
                  });
                }}
                className="btn btn-success fs-6"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <Trans i18nKey="approve-registeration" />
              </button>
              <button
                onClick={() => {
                  setState(false);
                  setEmailData({
                    message:
                      "بعد استعراض بياناتكم والتحقق منها، نأسف لإعلامكم بأن طلب شركتكم تم رفضه. يمكنكم التواصل معنا للمزيد من المعلومات أو للإستفسارات.",
                  });
                }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-danger fs-6"
              >
                <Trans i18nKey="reject-registeration" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* APPROVAL MODAL */}

      <div
        className="modal modal-xl fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="contactModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="contactModalLabel">
                Contact Us
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="m-5 text-center">
                <img
                  src={state ? APPROVED_IMAGE : REJECTED_IMAGE}
                  alt="g"
                  width="400"
                />
              </div>
              <div className="details vw-75">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="addon-wrapping">
                    <i className="fas fa-user"></i>
                  </span>
                  <input
                    disabled
                    value={companyData?.legalName}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="addon-wrapping">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    placeholder="Email"
                    value={companyData?.email}
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                  />
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    onChange={handleInputChange}
                    name="message"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    value={emailData?.message}
                  ></textarea>
                  <label htmlFor="floatingTextarea2" className="form-label">
                    Message
                  </label>

                  {state && (
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="addon-wrapping">
                        <i className="fas fa-file"></i>
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
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <Trans i18nKey='close' />
              </button>
              <button
                onClick={sendEmail}
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <Trans i18nKey='send' />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* END OF APPROVAL MODAL */}
    </div>
  );
}
