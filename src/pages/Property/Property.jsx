import classNames from "classnames";
import React, { useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPropertyById,
  getPropertyDataByUser,
  requestForContact,
} from "../../redux/slices/propertySlice";
import { getUserData, isLoggedIn } from "../../utils/auth";
import styles from "./Property.module.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function Property() {
  const dispatch = useDispatch();
  const { propertyId } = useParams();

  const { userRole } = getUserData();

  const { loading, status, property } = useSelector(
    (store) => store.properties
  );

  const getPropertyData = useCallback(() => {
    if (isLoggedIn()) {
      dispatch(
        getPropertyDataByUser({ userId: getUserData().userId, propertyId })
      ).catch((err) => alert(err.message));
    } else
      dispatch(getPropertyById(propertyId)).catch((err) => alert(err.message));
  }, [dispatch, propertyId]);

  useEffect(() => {
    getPropertyData();
  }, [getPropertyData]);

  const handleRequestClick = useCallback(() => {
    dispatch(
      requestForContact({
        userId: getUserData().userId,
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
        <LoadingSpinner />
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
        <div>
          {getUserData().userRole ===
          "Admin" ? null : property.approvalStatus === 2 ? (
            <div className="w-100">
              Contact Agent:
              <a
                className="text-decoration-none"
                href={`tel:${property.contactNumber}`}
              >
                {property.contactNumber}
              </a>
            </div>
          ) : property.approvalStatus === 1 ? (
            <Button variant="info">Pending Approval</Button>
          ) : property.approvalStatus === 3 ? (
            <Button variant="danger">Rejected</Button>
          ) : userRole === "Buyer" && property.approvalStatus === 0 ? (
            <Button onClick={handleRequestClick} variant="info">
              Request Approval
            </Button>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default Property;
