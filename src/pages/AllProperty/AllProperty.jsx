import classNames from "classnames";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { getAllProperty } from "../../redux/slices/propertySlice";
import styles from "./AllProperty.module.css";

function AllProperty() {
  const propertiesStore = useSelector((store) => store.properties);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProperty());
  }, [dispatch]);

  if (propertiesStore.loading) {
    return (
      <main className="d-flex align-items-center justify-content-center text-center">
        <h4>Loading....</h4>
      </main>
    );
  }
  if (propertiesStore.status === "rejected") {
    return (
      <main className="d-flex align-items-center justify-content-center text-center">
        <h4> Some Error Occurred please try later</h4>
      </main>
    );
  }

  return (
    <main className="">
      <div
        className={classNames(
          "d-flex align-items-center",
          styles.availablePropertyBanner
        )}
      >
        <div className={classNames("container ", styles.bannerTextContainer)}>
          <h1>Available Property</h1>
          <div className={classNames("text-wrap", styles.bannerText)}>
            Get Started by choosing from one of our pre-built page templates to
            showcase your properties.
          </div>
        </div>
      </div>
      <section className="container text-center my-5">
        <h1>Properties for Sale</h1>
        <div className={classNames("mt-5", styles.propertyGrid)}>
          {!propertiesStore?.loading &&
          propertiesStore?.status === "fulfilled" ? (
            propertiesStore?.properties?.map((property, index) => (
              <PropertyCard
                key={property?.propertyId}
                property={property}
                index={index > 8 ? index - 8 : index}
              />
            ))
          ) : (
            <>No Data to show</>
          )}
        </div>
      </section>
      <Newsletter />
    </main>
  );
}

export default AllProperty;
