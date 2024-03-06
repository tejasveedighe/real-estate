import React, { useEffect, useState } from "react";
import { Badge, Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/slices/userSlice";
import { getUserData, isLoggedIn } from "../../utils/auth";
import styles from "./Property.module.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import DatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useCallback } from "react";
import { getOfferById, sendOffer } from "../../redux/slices/offerSlice";
import { toast } from "react-toastify";
import { isObjectNotEmpty } from "../../utils/helpers";

export function ContactContainer({ property, handleRequestClick }) {
  const dispatch = useDispatch();

  const { userRole } = getUserData();
  const { userDetails, loading } = useSelector((store) => store.user);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (property.approvalStatus === 2) {
      dispatch(getUserById(property.userId)).then((res) => {
        if (res.payload === "Request failed with status code 404") {
          setError(true);
        }
      });
    }
  }, [dispatch, property]);

  if (!isLoggedIn() || getUserData().userRole !== "Buyer") return null;

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
                  Name -&nbsp;
                  <span className="text-decoration-none">
                    {userDetails.name}
                  </span>
                </span>
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
        <Offer property={property} />
      </div>
    </>
  );
}

const Offer = ({ property }) => {
  const dispatch = useDispatch();
  const { userId } = getUserData();
  const [show, setShow] = useState(false);
  const [value, onChange] = useState(new Date());

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  const { offer, loading } = useSelector((store) => store.offer);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const offerPrice = formData.get("offerPrice");
      const offerText = formData.get("text");
      dispatch(
        sendOffer({
          offerPrice,
          offerText,
          offerLastDate: value,
          propertyId: property.propertyId,
          sellerId: property.userId,
          buyerId: userId,
        })
      )
        .then((res) => {
          toast.success(res.payload);
        })
        .then(handleClose)
        .catch((err) => toast.error(err.message));
    },
    [dispatch, property, userId, value, handleClose]
  );

  useEffect(() => {
    dispatch(getOfferById({ propertyId: property.propertyId, userId }));
  }, [dispatch, property.propertyId, userId]);

  if (loading) return <LoadingSpinner />;

  if (isObjectNotEmpty(offer)) {
    return (
      <div className={styles.offerStatusContainer}>
        <h5>
          Offer Status:&nbsp;
          {offer.offerStatus === 3 ? (
            <Badge bg="danger">Rejected</Badge>
          ) : offer.offerStatus === 2 ? (
            <Badge bg="success">Completed</Badge>
          ) : (
            <Badge bg="warning">Pending</Badge>
          )}
        </h5>
        <span className="d-flex align-items-center gap-2">
          <Form.Check
            checked={offer.adminStatus === 2}
            type="checkbox"
            label="Admin"
          />
          {offer.adminStatus === 3 ? (
            <Badge bg="danger">Rejected</Badge>
          ) : offer.adminStatus === 2 ? (
            <Badge bg="success">Approved</Badge>
          ) : (
            <Badge bg="warning">Pending</Badge>
          )}
        </span>
        <span className="d-flex align-items-center gap-2">
          <Form.Check
            checked={offer.sellerStatus === 2}
            type="checkbox"
            label="Seller"
          />
          {offer.sellerStatus === 3 ? (
            <Badge bg="danger">Rejected</Badge>
          ) : offer.sellerStatus === 2 ? (
            <Badge bg="success">Approved</Badge>
          ) : (
            <Badge bg="warning">Pending</Badge>
          )}
        </span>

        {offer.offerStatus === 3 ? (
          <Button className="mt-4" variant="warning" onClick={handleShow}>
            Retry Offer
          </Button>
        ) : (
          <Button className="mt-4" variant="info" disabled>
            Offer Sent
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <Button onClick={handleShow}>Make Offer</Button>
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
            <div className="mt-3 d-flex align-items-center gap-3">
              <div>Offer Last Date</div>
              <div>
                <DatePicker onChange={onChange} value={value} />
              </div>
            </div>
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
};