import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import PropertyCard from "../PropertyCard/PropertyCard";
import { responsiveProperties } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperty } from "../../redux/slices/propertySlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export function Properties({ title }) {
  const dispatch = useDispatch();
  const propertiesStore = useSelector((store) => store.properties);

  useEffect(() => {
    dispatch(getAllProperty());
  }, [dispatch]);

  if (propertiesStore.loading)
    return (
      <section className="d-flex align-items-center justify-content-center">
        <LoadingSpinner />
      </section>
    );

  return (
    <section className=" d-flex align-items-center justify-content-center flex-column mt-5">
      <h1>{title}</h1>

      <Carousel
        containerClass={"container my-5 p-5"}
        itemClass="d-flex align-items-center justify-content-center"
        infinite
        rewind
        rewindWithAnimation
        partialVisbile="false"
        responsive={responsiveProperties}
      >
        {!propertiesStore.loading && propertiesStore.status === "fulfilled" ? (
          propertiesStore.properties.map((property, index) => (
            <PropertyCard
              key={property?.propertyId}
              property={property}
              index={index}
            />
          ))
        ) : (
          <>No Data to show</>
        )}
      </Carousel>
    </section>
  );
}
