import React, { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import "./Home.css";
import {
  faArrowRightFromBracket,
  faBuilding,
  faCommentsDollar,
  faFileLines,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import CanvasJSReact from "@canvasjs/react-charts";
import i18next, { t } from "i18next";
import { useApi } from "../../../contexts/apiContext";
import { baseURL } from "../../../APIs/baseURL";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const animateOnScroll = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const options = {
  animationEnabled: true,
  exportEnabled: true,
  theme: "light2",
  title: { text: t("income") },
  axisY: { title: t("profits") },
  axisX: { title: t("month"), prefix: "W", interval: 2 },
  data: [
    {
      type: "line",
      toolTipContent: "Week {x}: {y}%",
      dataPoints: [
        { x: 1, y: 64 },
        { x: 2, y: 61 },
        { x: 3, y: 64 },
        { x: 4, y: 62 },
        { x: 5, y: 64 },
        { x: 6, y: 60 },
        { x: 7, y: 58 },
      ],
    },
  ],
};

export default function Home() {
  const { getAllResources } = useApi();

  let [statistics, setStatistics] = useState(null);

  useEffect(() => {
    let fetch = async () => {
      let response = await getAllResources(`${baseURL}statistics`);
      setStatistics(response?.data);
      console.log(response?.data);
    };

    fetch();
  }, []);

  const renderCard = (
    icon,
    titleKey,
    value,
    growthKey,
    potentialGrowth,
    iconColor
  ) => (
    <motion.div
      className="col-xl-6 col-lg-6 col-md-6 col-sm-9 col-12 mb-3"
      initial={{ opacity: 0, y: 20, scale: 0.6 }}
      variants={animateOnScroll}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: { delay: 0.5, type: "keyframes", duration: 0.3 },
      }}
      whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
      whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
    >
      <div className="card h-100 shadow">
        <div className="card-body d-flex align-items-center p-3">
          <div className="fs-1 col-2 text-center">
            <FontAwesomeIcon icon={icon} style={{ color: iconColor }} />
          </div>
          <div className="d-flex ms-3 ms-md-1 flex-column col-10">
            <div className="col-9 mb-2 d-flex">
              <h5 className="mb-0">
                <Trans i18nKey={titleKey}></Trans>
              </h5>
            </div>
            <div className="col-3 icon icon-box-success">
              <h2 className="text-primary">{value}</h2>
              <span className="mdi mdi-arrow-top-right icon-item"></span>
            </div>
            {/* <h6 className="text-muted font-weight-normal"></h6> */}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="w-100"
      initial={{ opacity: 0, x: -200 }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{ opacity: 0, x: 200 }}
      transition={{ type: "spring", duration: 0.5, ease: "easeOut" }}
    >
      <h1 className="text-center">
        <Trans i18nKey="home"></Trans>
      </h1>
      <div className="container-fluid">
        <div className="row justify-content-center">
          {renderCard(
            faFileLines,
            "warranty-contract-number",
            statistics ? statistics.InsuranceRequest_approved :
              <div class="spinner-grow text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>,
            "potential growth",
            "+3.5%",
            "blue"
          )}
          {renderCard(
            faCommentsDollar,
            "warranty-requests-number",
            statistics? statistics.InsuranceRequest_pending :
            <div class="spinner-grow text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>,
            "potential drop",
            "Potential Drop",
            "green"
          )}
        </div>

        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0, y: 20, scale: 0.6 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: { delay: 0.8, type: "keyframes", duration: 0.7 },
          }}
        >
          {renderCard(
            faBuilding,
            "companies-number",
            statistics ? statistics.company :
            <div class="spinner-grow text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>,
            "potential growth",
            "Potential Growth",
            "red"
          )}
          {renderCard(
            faUser,
            "users-number",
            statistics? statistics.individual :
            <div class="spinner-grow text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>,
            "potential growth",
            "Potential Growth",
            "orange"
          )}
        </motion.div>

        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0, y: 20, scale: 0.6 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: { delay: 0.8, type: "keyframes", duration: 0.7 },
          }}
        >
          {renderCard(
            faUser,
            "number-of-warranties-department-employees",
            statistics ? statistics.insuranceRequestsDepart :
            <div class="spinner-grow text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>,
            "potential growth",
            "Potential Growth",
            "blue"
          )}
          {renderCard(
            faUser,
            "number-of-compensations-department-employees",
            statistics ? statistics.compensationDepart :
            <div class="spinner-grow text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>,
            "potential growth",
            "Potential Growth",
            "green"
          )}
        </motion.div>

        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0, y: 20, scale: 0.6 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: { delay: 1.1, type: "keyframes", duration: 0.7 },
          }}
        >
          {/* {renderCard(
            faFileLines,
            "warranty-contract-number",
            33,
            "potential growth",
            "+3.5%",
            "blue"
          )} */}
          {renderCard(
            faCommentsDollar,
            "number-of-compensation-requests",
            statistics ? statistics.Compensations :
            <div class="spinner-grow text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>,
            "potential drop",
            "Potential Drop",
            "gold"
          )}
        </motion.div>

        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0, y: 20, scale: 0.6 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: { delay: 1.4, type: "keyframes", duration: 0.7 },
          }}
        >
          <div className="col-12   col-md-12 col-sm-9 mb-3">
            <div className="card shadow">
              <div className="card-body">
                <CanvasJSChart options={options} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
