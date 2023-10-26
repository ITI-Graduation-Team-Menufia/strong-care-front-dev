import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Trans } from "react-i18next";

const OurPartners = () => {
  const partners = [
    {
      id: 1,
      logo: "https://i.pinimg.com/564x/a5/c0/8d/a5c08d4194fb7429677f8c14952172dd.jpg",
      name: "Lenovo",
    },
    {
      id: 2,
      logo: "https://i.pinimg.com/564x/9f/ea/88/9fea889156f786fa357d4a80e9950ad6.jpg",
      name: "samsung",
    },
    {
      id: 3,
      logo: "https://i.pinimg.com/564x/24/c7/b5/24c7b5175156252e4b394cc504402b06.jpg",
      name: "Oppo",
    },
    {
      id: 4,
      logo: "https://i.pinimg.com/564x/85/f0/ca/85f0cae34200220807b76d204c4ce12b.jpg",
      name: "Nokia",
    },
    {
      id: 5,
      logo: "https://i.pinimg.com/564x/ba/d6/7b/bad67bd2076de6f39178c1cd0c35df79.jpg",
      name: "Honer",
    },
    {
      id: 6,
      logo: "https://i.pinimg.com/564x/ad/7b/e4/ad7be4021d5bd53a45ede6417fad731d.jpg",
      name: "infinix",
    },
    {
      id: 7,
      logo: "https://i.pinimg.com/564x/59/11/c7/5911c7517d2296437b3ba237dde08d1b.jpg",
      name: "lava",
    },
    {
      id: 8,
      logo: "https://i.pinimg.com/564x/e3/42/f9/e342f9bc5fe08cac6919f4d165f3b62d.jpg",
      name: "philips",
    },
    {
      id: 9,
      logo: "https://i.pinimg.com/564x/3f/c0/9f/3fc09f1aec955aae78807e1d014a3bd1.jpg",
      name: "acer",
    },
    {
      id: 10,
      logo: "https://i.pinimg.com/564x/9f/ea/88/9fea889156f786fa357d4a80e9950ad6.jpg",
      name: "asus",
    },
  ];
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 576) {
        setPerPage(2);
      } else if (window.innerWidth < 768) {
        setPerPage(3);
      } else {
        setPerPage(5);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h1 className="partners-title text-center py-2 display-4">
        <Trans i18nKey="Our Partners">Our Partners</Trans>
      </h1>
      <div className="container-fluid py-2 px-2">
        <Splide
          options={{
            perPage,
            gap: 10,
            drag: true,
            arrows: false,
            autoplay: true,
            interval: 2000,
            pauseOnHover: true,
            loop: true,
            autoHeight: true,
            rewind: true,
            speed: 2000,
          }}
        >
          {partners.map((item) => (
            <SplideSlide key={item.id}>
              <div className="px-5 ">
                <img
                  className="card-img-top "
                  src={item.logo}
                  alt={item.name + " image"}
                  style={{ height: "200px" }}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default OurPartners;
