import React from "react";
import { motion } from "framer-motion";
import { Trans } from "react-i18next";

const cardVariants = {
  hidden: {
    scale: 0.45,
    opacity: 0,
  },
  visible: {
    scale: 0.9,
    opacity: 1,
  },
};

const benefitCards = [
  {
    title: "Compensation",
    text: "Guaranteed compensation",
    icon: "fa-balance-scale",
    bgColor: "--primary-bg",
    delay: 1,
  },
  {
    title: "Secure Payment",
    text: "100% Secure Payment",
    icon: "fa-shield-alt",
    bgColor: "--primary-bg",
    delay: 2,
  },
  {
    title: "Best Price",
    text: "Guaranteed Low Cost",
    icon: "fa-sack-dollar",
    bgColor: "--primary-bg",
    delay: 3,
  },
  {
    title: "Fast Response",
    text: "Efficient Client Response",
    icon: "fa-tachometer-alt",
    bgColor: "--primary-bg",
    delay: 4,
  },
];

const Card = ({ card, index }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={cardVariants}
    transition={{ duration: 1, delay: index * 0.2 }}
    className="col-lg-3 col-md-6 col-sm-6 mb-4"
    // style={{ background: `var(${card.bgColor})` }}
  >
    <div
      className="card border-0 py-3 h-100"
      style={{ background: `var(${card.bgColor})` }}
    >
      <div className="card-body text-center">
        <i
          className={`fas fa-3x fa-bounce text-light ${card.icon} my-icon`}
          style={{
            "--fa-animation-delay": `${card.delay}s`,
          }}
        ></i>
        <motion.h3 className="card-title text-white">
          <Trans i18nKey={card.title}>card.title</Trans>
        </motion.h3>
        <motion.p className="card-text text-light ">
          <Trans i18nKey={card.text}>card.text</Trans>
        </motion.p>
      </div>
    </div>
  </motion.div>
);

function BenefitsOverview() {
  return (
    <section className="feature">
      <div className="container-fluid">
        <div className="row">
          {benefitCards.map((card, index) => (
            <Card key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsOverview;
