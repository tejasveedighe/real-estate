import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import {
  getAllProperty,
  searchProperty,
} from "../../redux/slices/propertySlice";
import styles from "./AllProperty.module.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";

function AllProperty() {
  const propertiesStore = useSelector((store) => store.properties);
  const dispatch = useDispatch();

  const [locations, setLocations] = useState([]);
  const [squareFeet, setSquareFeet] = useState([]);
  const [noBedroom, setNoBedroom] = useState([]);
  const [noBathroom, setNoBathroom] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [status, setStatus] = useState([]);

  const onSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      const propertyType = formData.get("propertyType");
      const status = formData.get("status");
      const location = formData.get("location");
      const squareFeet = formData.get("squareFeet");
      const noBathroom = formData.get("noBathroom");
      const noBedroom = formData.get("noBedroom");

      dispatch(
        searchProperty({
          propertyType,
          status,
          location,
          squareFeet,
          noBathroom,
          noBedroom,
        })
      );
    },
    [dispatch]
  );

  const setData = useCallback(() => {
    if (propertiesStore.status === "fulfilled") {
      setLocations(() =>
        propertiesStore.properties.map((property) => property.location)
      );
      setPropertyType(() =>
        propertiesStore.properties.map((property) => property.propertyType)
      );
      setSquareFeet(() =>
        propertiesStore.properties.map((property) => property.squareFeet)
      );
      setNoBedroom(() =>
        propertiesStore.properties.map((property) => property.noBedroom)
      );
      setNoBathroom(() =>
        propertiesStore.properties.map((property) => property.noBathroom)
      );
      setStatus(() =>
        propertiesStore.properties.map((property) => property.status)
      );
    }
  }, [propertiesStore.properties, propertiesStore.status]);

  useEffect(() => {
    dispatch(getAllProperty());
  }, [dispatch]);

  useEffect(() => {
    if (
      propertiesStore.lastAction === "getAllProperty" &&
      propertiesStore.status === "fulfilled"
    ) {
      setData();
    }
  }, [propertiesStore.lastAction, propertiesStore.status, setData]);

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
        <div className="d-flex align-items-center justify-content-between">
          <h1>Properties for Sale</h1>
          <Form onSubmit={onSearchSubmit}>
            <Form.Group>
              <InputGroup className="mb-3">
                <Form.Select
                  name="propertyType"
                  aria-placeholder="Select Property Type"
                >
                  <option disabled>Type</option>
                  {propertyType.map((type, index) => (
                    <option key={`Type-${index} ${type}`} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select name="status">
                  <option disabled>Status</option>
                  {status.map((status, index) => (
                    <option key={`Status-${index} ${status}`} value={status}>
                      {status}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select name="location">
                  <option disabled>Location</option>
                  {locations.map((location, index) => (
                    <option
                      key={`Location-${index} ${location}`}
                      value={location}
                    >
                      {location}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select name="squareFeet">
                  <option disabled>Area</option>
                  {squareFeet.map((area, index) => (
                    <option key={`Area-${index} ${area}`} value={area}>
                      {area}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select name="noBathroom">
                  <option disabled>Bathroom</option>
                  {noBathroom.map((bathroom, index) => (
                    <option
                      key={`Bathroom-${index} ${bathroom}`}
                      value={bathroom}
                    >
                      {bathroom}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select name="noBedroom">
                  <option disabled>Bedroom</option>
                  {noBedroom.map((bedroom, index) => (
                    <option key={`Bedroom-${index} ${bedroom}`} value={bedroom}>
                      {bedroom}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  type="submit"
                  variant="outline-primary"
                  id="button-addon2"
                >
                  <CiSearch />
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
        <div className={classNames("mt-5", styles.propertyGrid)}>
          {!propertiesStore?.loading &&
          propertiesStore?.status === "fulfilled" &&
          propertiesStore?.properties?.length ? (
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
