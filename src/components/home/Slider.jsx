import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import sliderImg1 from '../../assets/images/slider/1.jpg';
import sliderImg2 from '../../assets/images/slider/2.jpg';
import sliderImg3 from '../../assets/images/slider/3.jpg';
import sliderImg4 from '../../assets/images/slider/4.jpg';
import sliderImg5 from '../../assets/images/slider/5.jpg';


const Slider = ({ t }) => {
  const images = [
    { src: sliderImg1, captionKey: "warranty" },
    { src: sliderImg2, captionKey: "multi-service" },
    { src: sliderImg3, captionKey: "long-term" },
    { src: sliderImg4, captionKey: "guaranteed" },
    { src: sliderImg5, captionKey: "response" },
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const image = images[currentImageIndex];

  const nextImage = () => {
    // Calculate the index of the next image
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
  };

  const prevImage = () => {
    // Calculate the index of the previous image
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(prevIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      exit={{ opacity: 0 }}
      className="container-fluid p-0 mb-5"
    >
      <div
        id="carouselExample"
        className="carousel slide"
        style={{
          width: "100%",
          height: "600px",
          maxHeight: "800px",
          overflow: "hidden",
        }}
      >
        <AnimatePresence
          initial={false}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.img
            key={image.src}
            src={image.src}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="img-fluid w-100 h-100"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Slider Image"
          />
        </AnimatePresence>
        <motion.div
          key={image.captionKey} // Use the translation key as the key
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          exit={{ opacity: 0, x: 100 }}
          className="position-absolute text-white top-0 start-0 end-0 p-5"
        >
          <p
            className="float-end fs-1 fw-b text-gray "
            style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}
          >
            {t(image.captionKey)} {/* Translate the caption */}
          </p>
        </motion.div>

        <button
          onClick={prevImage}
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          onClick={nextImage}
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </motion.div>
  );
};

export default withTranslation()(Slider);
