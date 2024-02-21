import classNames from "classnames";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../../redux/slices/propertySlice";
import styles from "./Property.module.css";

function Property() {
  const dispatch = useDispatch();
  const { propertyId } = useParams();

  const { loading, errors, status, property } = useSelector(
    (store) => store.properties
  );

  useEffect(() => {
    dispatch(getPropertyById(propertyId)).catch((err) => alert(err.message));
  }, [dispatch, propertyId]);

  if (loading) {
    return (
      <main className="d-flex align-items-center justify-content-center text-center mt-5">
        <h1>Loading....</h1>
      </main>
    );
  }

  if (status === "rejected") {
    <main className="d-flex align-items-center justify-content-center text-center mt-5">
      <h1>Some error occured please try later</h1>
    </main>;
  }

  return (
    <main className="d-flex align-items-center justify-content-center">
      <section
        className={classNames(
          styles.parent,
          "d-flex align-items-center justify-content-center mt-5 p-5 flex-column"
        )}
      >
        <img
          src={`${process.env.PUBLIC_URL}/house0.jpg`}
          className={styles.propertyImg}
          alt="Property"
        />
        <hr className={styles.solid} />
        <div className=" w-100 mt-4">
          <h3>
            {property.propertyTitle} ({property.propertyType})
          </h3>
          <p className={styles.propertyDescription}>{property.description}</p>
        </div>
        <hr className={styles.solid} />
        <div className="w-100">
          <h5 className={styles.subHeading}>Condition:</h5>
          <div className={styles.propertyConditionGrid}>
            <div>
              Area: {property.squareFeet} m<sup>2</sup>
            </div>
            <div>Bedroom: {property.noBedroom}</div>
            <div>Bathroom: {property.noBathroom}</div>
            <div>Location: {property.location}</div>
            <div>Price: ${property.price}</div>
          </div>
        </div>
        <hr className={styles.solid} />
        <div className="w-100">
          Contact Agent:
          <a
            className="text-decoration-none"
            href={`tel:${property.contactNumber}`}
          >
            {property.contactNumber}
          </a>
        </div>
      </section>
    </main>
  );
}

export default Property;
