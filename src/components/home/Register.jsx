import React from "react";
import { Trans } from "react-i18next";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
  const navigate = useNavigate();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container my-5">
      <div
        className="row text-light p-5 rounded-top-3 justify-content-between"
        style={{ background: "linear-gradient(to left, #1e549f, #5fc9f3)" }}
      >
        <div className="d-flex flex-column justify-content-between col-md-9 col-sm-12">
          <h2 className="mb-4">
            <Trans i18nKey="compensation-1" />
          </h2>
          <div>
            <span className="fa-md">
              <Trans i18nKey="compensation-2" />
            </span>
          </div>
        </div>
        <div className="col-md-3 col-sm-12 d-flex justify-content-end">
          <button
            onClick={() => {
              navigate("/compensation");
            }}
            className="btn m-auto text-primary mt-4 bg-white fw-bolder"
          >
            <span className="lead fw-bold">
              <Trans i18nKey="compensation-button">طلب تعويض</Trans>
            </span>
          </button>
        </div>
      </div>

      <div className="row my-5 justify-content-center display-5">
        <h3>
          <Trans i18nKey="register" />
        </h3>
      </div>

      <div className="row justify-content-around text-center gap-5 my-5">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card p-0 col-md-5"
          onClick={() => navigate("/signup")}
        >
          <div
            className="text-light text p-3"
            style={{ background: "linear-gradient(to left, #1e549f, #5fc9f3)" }}
          >
            <h5 className="card-title fw-bold fs-sm-5">
              <Trans i18nKey="register-as-a-company" />
            </h5>
          </div>
          <div className="card-body text-primary p-5 d-flex flex-column justify-content-between">
            <div className="display-3">
              <i className="fa-solid fa-users icon"></i>
            </div>
            <p className="card-text lead">
              <Trans i18nKey="register-as-a-company-disc" />
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="card p-0 col-md-5"
          onClick={() => navigate("/register")}
        >
          <div
            className="text-light text p-3"
            style={{ background: "linear-gradient(to left, #1e549f, #5fc9f3)" }}
          >
            <h5 className="card-title fw-bold fs-sm-5">
              <Trans i18nKey="register-as-a-indevidual" />
            </h5>
          </div>
          <div className="card-body text-primary p-5 d-flex flex-column justify-content-between">
            <div className="display-3">
              <i className="fa-solid fa-user icon"></i>
            </div>
            <p className="card-text lead">
              <Trans i18nKey="register-as-a-indevidual-disc" />
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
