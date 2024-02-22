import React, { useCallback } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./PropertyCard.module.css";
import { useUserRole } from "../../utils/auth";
import { useDispatch } from "react-redux";
import { deleteProperty } from "../../redux/slices/propertySlice";

function PropertyCard({ property, index }) {
  const dispatch = useDispatch();
  const role = useUserRole();

  const handleDeleteProperty = useCallback(() => {
    dispatch(deleteProperty(property.propertyId))
      .then((res) => {
        alert("Property has been deleted");
      })
      .catch(() => alert("Failed to delete Property please try later"));
  }, [dispatch, property]);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        className={styles.image}
        src={`${process.env.PUBLIC_URL}/house${index}.jpg`}
      />
      <Card.Body>
        <Card.Title className={styles.title}>
          {property?.propertyTitle}
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Location: {property?.location}</ListGroup.Item>
        <ListGroup.Item>Price: ${property?.price}</ListGroup.Item>
        <ListGroup.Item>Bedrooms: {property?.noBedroom}</ListGroup.Item>
        <ListGroup.Item>Bathrooms: {property?.noBathroom}</ListGroup.Item>
        <ListGroup.Item>Square Feet: {property?.squareFeet}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between">
          <Button variant="primary">
            <Link
              to={`/property/${property?.propertyId}`}
              className="text-white text-decoration-none"
            >
              View
            </Link>
          </Button>
          {role === "Admin" ? (
            <Button onClick={handleDeleteProperty} variant="danger">
              Delete
            </Button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
}

export default PropertyCard;
