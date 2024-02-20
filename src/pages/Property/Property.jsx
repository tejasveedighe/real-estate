import React from "react";
import styles from "./Property.module.css";
import classNames from "classnames";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { Newsletter } from "../../components/Newsletter/Newsletter";

function Property() {
  return (
    <main className="">
      <div
        className={classNames(
          "d-flex align-items-center",
          styles.availablePropertyBanner
        )}
      >
        <div className={classNames("container", styles.bannerTextContainer)}>
          <h1>Available Property</h1>
          <div className={classNames("text-wrap", styles.bannerText)}>
            Get Started by choosing from one of our pre-built page templates to
            showcase your properties.
          </div>
        </div>
      </div>
      <section className="container text-center mt-5">
        <h1>Properties for Sale</h1>
        <div className={classNames("mt-5", styles.propertyGrid)}>
          {Array.apply(null, Array(9)).map((item) => (
            <PropertyCard key={item} />
          ))}
        </div>
      </section>
      <Newsletter />
    </main>
  );
}

export default Property;
