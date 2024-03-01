import classNames from "classnames";
import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { AgentsCarousel } from "../../components/AgentsGridCarousel/AgentsCarousel";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import { Properties } from "../../components/Properties/Properties";
import styles from "./Home.module.css";

function Home() {
  return (
    <main className="">
      <section
        className={classNames(
          "d-flex align-items-center flex-column justify-content-center",
          styles.imageSection
        )}
      >
        <div className={classNames("text-white", styles.searchProperty)}>
          Discover a place
          <br /> you'll love to Live.
        </div>
        <ButtonGroup>
          <Button>Buy</Button>
          <Button>Rent</Button>
          <Button>Sell</Button>
        </ButtonGroup>
        <search>

        </search>
      </section>

      <Properties title={"Display Latest & Featured Properties"} />

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
            />
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
            <Link to={"/"}>Home & Apartment</Link>
          </div>
          <div className={styles.propertyTypeContainer}>
            <img
              src="https://preview.colorlib.com/theme/konato/assets/img/icon/property2.svg"
              alt=""
            />
            <Link to={"/"}>Vila</Link>
          </div>
          <div className={styles.propertyTypeContainer}>
            <img
              src="	https://preview.colorlib.com/theme/konato/assets/img/icon/property3.svg
"
              alt=""
            />
            <Link to={"/"}>Studio</Link>
          </div>
          <div className={styles.propertyTypeContainer}>
            <img
              src="https://preview.colorlib.com/theme/konato/assets/img/icon/property4.svg"
              alt=""
            />
            <Link to={"/"}>Office</Link>
          </div>
        </div>
      </section>

      <AgentsCarousel />

      <Newsletter />
    </main>
  );
}

export default Home;
