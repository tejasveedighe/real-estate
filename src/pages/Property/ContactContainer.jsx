import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/slices/userSlice";
import { getUserData, isLoggedIn } from "../../utils/auth";
import styles from "./Property.module.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import DatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useCallback } from "react";

export function ContactContainer({ property, handleRequestClick }) {
  const dispatch = useDispatch();

  const { userRole } = getUserData();
  const { userDetails, loading } = useSelector((store) => store.user);
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);
  const [value, onChange] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const offerPrice = formData.get("offerPrice");
      const text = formData.get("text");
      console.log(offerPrice, text, value);
    },
    [value]
  );

  useEffect(() => {
    if (property.approvalStatus === 2) {
      dispatch(getUserById(property.userId)).then((res) => {
        if (res.payload === "Request failed with status code 404") {
          setError(true);
        }
      });
    }
  }, [dispatch, property]);

  if (!isLoggedIn()) return null;

  return (
    <>
      <div className={styles.propertySide}>
        <div className={styles.contactContainer}>
          <h3>Contact Details of Seller</h3>
          <hr />
          {getUserData().userRole ===
          "Admin" ? null : property.approvalStatus === 2 ? (
            error ? (
              <>No Details found</>
            ) : loading ? (
              <LoadingSpinner />
            ) : (
              <div className="w-100 d-flex flex-column align-items-start">
                <span>
                  Contact -&nbsp;
                  <a
                    className="text-decoration-none"
                    href={`tel:${property.contactNumber}`}
                  >
                    {property.contactNumber}
                  </a>
                  {userDetails.phone ? (
                    <>
                      ,
                      <a
                        className="text-decoration-none"
                        href={`tel:${property.contactNumber}`}
                      >
                        {userDetails.phone}
                      </a>
                    </>
                  ) : null}
                </span>
                <span>
                  Email -&nbsp;
                  <a
                    className="text-decoration-none"
                    href={`mailto:${userDetails.email}`}
                  >
                    {userDetails.email}
                  </a>
                </span>
                <span>
                  Name -&nbsp;
                  <a href="#" className="text-decoration-none">
                    {userDetails.name}
                  </a>
                </span>
              </div>
            )
          ) : property.approvalStatus === 1 ? (
            <Button variant="info">Pending Approval</Button>
          ) : property.approvalStatus === 3 ? (
            <Button variant="danger">Rejected</Button>
          ) : userRole === "Buyer" && property.approvalStatus === 0 ? (
            <Button
              onClick={handleRequestClick}
              variant="info"
              className="text-white"
            >
              Request Approval
            </Button>
          ) : null}
        </div>
        <Button onClick={handleShow}>Make Offer</Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make an Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <FloatingLabel label="Your Price Offer">
              <Form.Control
                name="offerPrice"
                required
                type="number"
                pattern="{0-9}"
                defaultValue={property.price}
              />
            </FloatingLabel>
            <Form.Group className="mt-3">
              <Form.Label>Offer Last Date</Form.Label>
              <div>
                <DatePicker onChange={onChange} value={value} />
              </div>
            </Form.Group>
            <Form.Group className="mt-3">
              <label htmlFor="floatingInputCustom">
                Anything Regarding the offer
              </label>
              <Form.Control
                id="floatingInputCustom"
                name="text"
                as="textarea"
                rows={6}
                type="text"
              />
            </Form.Group>
            <Button className="mt-3 float-end" variant="primary" type="submit">
              Send Offer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
