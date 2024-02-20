import React from "react";
import styles from "./Home.module.css";
import classNames from "classnames";
import { Button } from "react-bootstrap";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Home() {
  return (
    <main className="">
      <section
        className={classNames(
          "d-flex align-items-center justify-content-center",
          styles.imageSection
        )}
      >
        <div className="container text-white">
          <span className="fs-4">3 Bed - 2 Bath - 2000 Sq Ft</span>
          <p className={styles.propertyHeading}>Light House NY</p>
          <p className={"fs-5"}>
            Get Started by choosing from one of our pre-built page <br />
            templates to showcase your properties.
          </p>
          <p className="fs-2">$ 4,569 </p>
          <Button className={styles.viewBtn}>View Property</Button>
        </div>
      </section>

      <section className="d-flex align-items-center justify-content-center flex-column mt-5">
        <h1>Display Latest & Featured Properties</h1>

        <Carousel
          containerClass={"container my-5"}
          itemClass="d-flex align-items-center justify-content-center"
          infinite
          rewind
          rewindWithAnimation
          partialVisbile="false"
          slidesToSlide={1}
          responsive={responsive}
        >
          {Array.apply(null, Array(10)).map((item, index) => {
            return <PropertyCard key={item} />;
          })}
        </Carousel>
      </section>

      <section
        className={classNames(
          "d-flex align-items-center justify-content-center flex-column gap-5",
          styles.helpPeopleSection
        )}
      >
        <h1>How Do we help People?</h1>
        <div className={styles.gridContainer}>
          <div className="text-center d-flex justify-content-center align-items-center flex-column gap-3">
            <img
              alt="log"
              src="	https://preview.colorlib.com/theme/konato/assets/img/icon/services1.svg
              
"
            ></img>
            <h3>Sell home or office</h3>
            <p>
              Get Started by choosing from one of our pre-built templates to
              showcase your properties.
            </p>
          </div>

          <div className="text-center d-flex justify-content-center align-items-center flex-column gap-3">
            <img
              src="https://preview.colorlib.com/theme/konato/assets/img/icon/services2.svg"
              alt="log"
            />
            <h3>Sell home or office</h3>
            <p>
              Get Started by choosing from one of our pre-built templates to
              showcase your properties.
            </p>
          </div>
          <div className="text-center d-flex justify-content-center align-items-center flex-column gap-3">
            <img
              src="https://preview.colorlib.com/theme/konato/assets/img/icon/services3.svg"
              alt=""
            />
            <h3>Sell home or office</h3>
            <p>
              Get Started by choosing from one of our pre-built templates to
              showcase your properties.
            </p>
          </div>
        </div>
      </section>

      <section className="d-flex align-items-center justify-content-center flex-column mt-5">
        <h1>Properties for Sale</h1>

        <Carousel
          containerClass={"container my-5"}
          itemClass="d-flex align-items-center justify-content-center"
          infinite
          rewind
          rewindWithAnimation
          partialVisbile="false"
          slidesToSlide={1}
          responsive={responsive}
        >
          {Array.apply(null, Array(10)).map((item, index) => {
            return <PropertyCard key={item} />;
          })}
        </Carousel>
      </section>

      <section
        className={classNames(
          "d-flex align-items-center justify-content-center",
          styles.exploreSection
        )}
      >
        <div
          className={classNames(
            "d-flex align-items-start gap-3 flex-column",
            styles.propertySide
          )}
        >
          <h2>
            Explore <br /> by Property Type
          </h2>
          <span>
            Get Started by choosing from one of our pre-built page templates to
            showcase your properties.
          </span>
          <Button className={styles.viewAllPropertyButton}>
            View All Property
          </Button>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className={styles.propertyTypeContainer}>
            <img
              src="https://preview.colorlib.com/theme/konato/assets/img/icon/property1.svg"
              alt=""
            />
            <span>Home & Apartment</span>
          </div>
          <div className={styles.propertyTypeContainer}>
            <img
              src="https://preview.colorlib.com/theme/konato/assets/img/icon/property2.svg"
              alt=""
            />
            <span>Vila</span>
          </div>
          <div className={styles.propertyTypeContainer}>
            <img
              src="	https://preview.colorlib.com/theme/konato/assets/img/icon/property3.svg
"
              alt=""
            />
            <span>Studio</span>
          </div>
          <div className={styles.propertyTypeContainer}>
            <img
              src="https://preview.colorlib.com/theme/konato/assets/img/icon/property4.svg"
              alt=""
            />
            <span>Office</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
