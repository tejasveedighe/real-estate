import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function PropertyCard({ property, index }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`${process.env.PUBLIC_URL}/house${index}.jpg`}
      />
      <Card.Body>
        <Card.Title>{property?.propertyTitle}</Card.Title>
        <Card.Text>{property?.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Location: {property?.location}</ListGroup.Item>
        <ListGroup.Item>Price: ${property?.price}</ListGroup.Item>
        <ListGroup.Item>Bedrooms: {property?.noBedroom}</ListGroup.Item>
        <ListGroup.Item>Bathrooms: {property?.noBathroom}</ListGroup.Item>
        <ListGroup.Item>Square Feet: {property?.squareFeet}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link to={`/property/${property?.propertyId}`}>View Details</Link>
      </Card.Body>
    </Card>
  );
}

export default PropertyCard;
