import classNames from "classnames";
import React, { useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPropertyById,
  requestForContact,
} from "../../redux/slices/propertySlice";
import { isLoggedIn } from "../../utils/auth";
import styles from "./Property.module.css";
import Cookies from "js-cookie";

function Property() {
  const dispatch = useDispatch();
  const { propertyId } = useParams();

  const { loading, errors, status, property } = useSelector(
    (store) => store.properties
  );

  useEffect(() => {
    dispatch(getPropertyById(propertyId)).catch((err) => alert(err.message));
  }, [dispatch, propertyId]);

  const handleRequestClick = useCallback(() => {
    dispatch(
      requestForContact({
        userId: Cookies.get("userId"),
        propertyId,
      })
    )
      .then((res) => {
        if (res.type === "properties/requestForContact/fulfilled") {
          alert(
            "Your Request has been sent to the admin, you will see the contact when Admin Approves"
          );
        }
      })
      .catch((err) => {
        alert(`Unable to request: ${err.message}`);
      });
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
            <div className="text-capitalize">
              <b>Area: </b>
              {property.squareFeet} m<sup>2</sup>
            </div>
            <div className="text-capitalize">
              <b>Bedroom: </b>
              {property.noBedroom}
            </div>
            <div className="text-capitalize">
              <b>Bathroom: </b>
              {property.noBathroom}
            </div>
            <div className="text-capitalize">
              <b>Location: </b>
              {property.location}
            </div>
            <div className="text-capitalize">
              <b>Price: </b>${property.price}
            </div>
          </div>
        </div>
        <hr className={styles.solid} />
        {property.approved ? (
          <div className="w-100">
            Contact Agent:
            <a
              className="text-decoration-none"
              href={`tel:${property.contactNumber}`}
            >
              {property.contactNumber}
            </a>
          </div>
        ) : isLoggedIn() ? (
          <Button onClick={handleRequestClick} variant="info">
            Request Approval
          </Button>
        ) : null}
      </section>
    </main>
  );
}

export default Property;
