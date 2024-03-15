import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  getPropertyById,
  updateProperty,
} from "../../redux/slices/propertySlice";
import { getUserData } from "../../utils/auth";
import { isObjectNotEmpty } from "../../utils/helpers";
import styles from "./AddProperty.module.css";

function EditProperty() {
  const dispatch = useDispatch();
  const formRef = useRef();

  const { userId } = getUserData();
  const { propertyId } = useParams();

  const { loading, property, updateLoading } = useSelector(
    (state) => state.properties
  );

  const [amenities, setAmenities] = useState({
    swimmingPool: false,
    parking: false,
    lifts: false,
    temple: false,
    rooftopAccess: false,
    parks: false,
  });

  useEffect(() => {
    dispatch(getPropertyById(propertyId));
  }, [dispatch, propertyId]);

  useEffect(() => {
    if (!loading && isObjectNotEmpty(property) && formRef.current) {
      const {
        propertyTitle,
        propertyType,
        price,
        description,
        location,
        status,
        noBedroom,
        noBathroom,
        squareFeet,
        approved,
        amenities,
      } = property;
      setAmenities(amenities);
      formRef.current.reset();
      formRef.current.elements.propertyTitle.value = propertyTitle;
      formRef.current.elements.propertyType.value = propertyType;
      formRef.current.elements.price.value = price;
      formRef.current.elements.description.value = description;
      formRef.current.elements.location.value = location;
      formRef.current.elements.status.value = status;
      formRef.current.elements.noBedroom.value = noBedroom;
      formRef.current.elements.noBathroom.value = noBathroom;
      formRef.current.elements.squareFeet.value = squareFeet;
      formRef.current.elements.approved.value = approved;
    }
  }, [loading, property]);

  const handleAmenitiesChange = useCallback((e) => {
    const { name, checked } = e.target;
    setAmenities((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const propertyData = {
        propertyTitle: formData.get("propertyTitle"),
        propertyType: formData.get("propertyType"),
        price: Number.parseFloat(formData.get("price")),
        description: formData.get("description"),
        location: formData.get("location"),
        status: formData.get("status"),
        noBedroom: Number.parseInt(formData.get("noBedroom")),
        noBathroom: Number.parseInt(formData.get("noBathroom")),
        squareFeet: Number.parseInt(formData.get("squareFeet")),
        approved: formData.get("approved") === "true",
        amenities: amenities,
        userId: userId,
        propertyId,
      };

      dispatch(updateProperty({ propertyId, propertyData }))
        .then((res) => {
          if (res.type === "property/update/fulfilled") {
            toast.success("Property updated successfully");
            formRef.current.reset();
          }
        })
        .catch((err) => toast.error(err.message));
    },
    [amenities, userId, dispatch, propertyId]
  );

  return (
    <main
      className={classNames(
        styles.parent,
        "d-flex align-items-center flex-column justify-content-center"
      )}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Form
          ref={formRef}
          onSubmit={onSubmit}
          className=" bg-white p-5 d-flex align-items-center justify-content-center flex-column"
        >
          <h1 className="mb-4">Edit Property</h1>
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
                  name="price"
                  required
                  placeholder="Enter Your Price here"
                />
              </Form.Group>
            </div>
            <Form.Group className="mt-3">
              <Form.Label>Property Type</Form.Label>
              <Form.Select
                name="propertyType"
                required
                placeholder="Enter Property Type"
              >
                <option value="Bunglow">Bunglow</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
                <option value="Residential">Residential</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Property Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
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
                name="location"
                required
                placeholder="Enter Property Location"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" required aria-label="Select Status">
                <option disabled>Select one</option>
                <option value={"Rent"}>Rent</option>
                <option defaultChecked value={"Sale"}>
                  Sale
                </option>
              </Form.Select>
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
                <option defaultChecked value={false}>
                  False
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Amenities</Form.Label>
              <div className={styles.amenitiesGrid}>
                {Object.entries(amenities).map(([key, value]) =>
                  key !== "id" ? (
                    <Form.Check
                      className="col"
                      key={key}
                      type="checkbox"
                      name={key}
                      checked={value}
                      onChange={handleAmenitiesChange}
                      label={key}
                    />
                  ) : null
                )}
              </div>
            </Form.Group>
          </div>

          <Button
            type="submit"
            variant="success"
            className="align-self-end mt-3"
            disabled={updateLoading}
          >
            {updateLoading ? <LoadingSpinner /> : " Update Property "}
          </Button>
        </Form>
      )}
    </main>
  );
}

export default EditProperty;
