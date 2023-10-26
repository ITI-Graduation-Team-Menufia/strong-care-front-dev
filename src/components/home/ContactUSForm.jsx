import React, { useState } from "react";
import { Trans } from "react-i18next";
import { useApi } from "../../contexts/apiContext";
import { baseURL } from "../../APIs/baseURL";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUSForm() {
  const { createResource, setBaseUrl, baseUrl, loading } = useApi();
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errorList, setErrorList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const notifySuccess = () => toast("تم إرسال رسالتكم بنجاح!");

  const contactUsSchema = Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .required()
      .description("Name must be a string, at least 2 characters long"),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .description("Email must be a valid email address"),

    phone: Joi.string().required().description("Phone must be a string"),

    message: Joi.string()
      .min(15)
      .required()
      .description("Description should be at least 15 characters long"),
  });

  const validateContactUs = (data, schema) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      setErrorList(error.details);
      return false;
    }
    setErrorList([]);
    return true;
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const isValidData = validateContactUs(contactData, contactUsSchema);

    if (!isValidData) return;
    let res = await createResource(contactData, `${baseURL}contactus/`);
    if (res?.message === "success") {
      setContactData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      notifySuccess();
    }
  };

  return (
    <div className="sec">
      <ToastContainer />
      <div className="overlay">
        <div className="container-fluid text-center w-75 py-4 contact">
          <h2 className="primary-text mb-4">
            <Trans i18nKey="contact-with-us"></Trans>
          </h2>

          <form>
            <div className="name form-group">
              <label htmlFor="name" className="gray-text">
                <Trans i18nKey="name"></Trans>
              </label>
              <input
                type="text"
                name="name"
                value={contactData.name}
                onChange={handleInputChange}
                className="form-control w-75 font-medium border rounded-0 mb-3 mt-2 mx-auto border-slate-300 placeholder:opacity-60"
                placeholder=""
              />
              {errorList.map((error) =>
                error.context.key === "name" ? (
                  <div key={error.message} className="text-danger">
                    {error.message}
                  </div>
                ) : null
              )}
            </div>
            <div className="email form-group">
              <label htmlFor="email" className="gray-text">
                <Trans i18nKey="email"></Trans>
              </label>
              <input
                type="email"
                name="email"
                value={contactData.email}
                onChange={handleInputChange}
                className="form-control w-75 font-medium border rounded-0 mb-3 mt-2 mx-auto border-slate-300 placeholder:opacity-60"
                placeholder=""
              />
              {errorList.map((error) =>
                error.context.key === "email" ? (
                  <div key={error.message} className="text-danger">
                    {error.message}
                  </div>
                ) : null
              )}
            </div>
            <div className="phone form-group">
              <label htmlFor="phone" className="gray-text">
                <Trans i18nKey="phone"></Trans>
              </label>
              <input
                type="text"
                name="phone"
                value={contactData.phone}
                onChange={handleInputChange}
                className="form-control w-75 font-medium border rounded-0 mb-3 mt-2 mx-auto border-slate-300 placeholder:opacity-60"
                placeholder=""
              />
              {errorList.map((error) =>
                error.context.key === "phone" ? (
                  <div key={error.message} className="text-danger">
                    {error.message}
                  </div>
                ) : null
              )}
            </div>
            <div className="msg form-group">
              <label htmlFor="message" className="gray-text">
                <Trans i18nKey="message"></Trans>
              </label>
              <textarea
                className="form-control w-75 font-medium border rounded-0 mb-3 mt-2 mx-auto border-slate-300 placeholder:opacity-60"
                type="text"
                name="message"
                value={contactData.message}
                onChange={handleInputChange}
                placeholder=""
              />
              {errorList.map((error) =>
                error.context.key === "message" ? (
                  <div key={error.message} className="text-danger">
                    {error.message}
                  </div>
                ) : null
              )}
            </div>
            <button onClick={sendMessage} className="btn btn-primary px-5">
              <Trans i18nKey="send"></Trans>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
