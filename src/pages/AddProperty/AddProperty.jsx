import React from "react";
import styles from "./AddProperty.module.css";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import classNames from "classnames";

function AddProperty() {
  const dispatch = useDispatch();

  return (
    <main
      className={classNames(
        styles.parent,
        "d-flex align-items-center flex-column justify-content-center"
      )}
    >
      <Form className=" bg-white p-5 d-flex align-items-center justify-content-center flex-column">
        <h1 className="mb-4">Add Property</h1>
        <div>
          <div className="d-flex align-items-center justify-content-center gap-5">
            <Form.Group>
              <Form.Label>Property Title</Form.Label>
              <Form.Control
                type="text"
                name="propertyTitle"
                required
                placeholder="Enter Your title here"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="propertyPrice"
                required
                placeholder="Enter Your title here"
              />
            </Form.Group>
          </div>
          <Form.Group className="mt-3">
            <Form.Label>Property Description</Form.Label>
            <Form.Control
              as="textarea"
              name="propertyDescription"
              required
              placeholder="Enter Property Description"
            />
          </Form.Group>
        </div>
        <div className={styles.grid}>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="propertyLocation"
              required
              placeholder="Enter Property Location"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              required
              placeholder="Enter Property Status"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>No of Bedroom</Form.Label>
            <Form.Control
              type="number"
              name="noBedroom"
              required
              placeholder="Enter No of Bedrooms"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>No of Bathroom</Form.Label>
            <Form.Control
              type="number"
              name="noBathroom"
              required
              placeholder="Enter No of Bathroom"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Area</Form.Label>
            <Form.Control
              type="number"
              name="squareFeet"
              required
              placeholder="Enter Area in sq feet"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Approved</Form.Label>
            <Form.Select
              name="approved"
              required
              aria-label="Select Approve status"
            >
              <option disabled>Select one</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Select>
          </Form.Group>
        </div>
      </Form>
    </main>
  );
}

export default AddProperty;
