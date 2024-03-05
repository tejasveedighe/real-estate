import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPropertiesById } from "../../redux/slices/userSlice";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

function User() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  useEffect(() => {
    dispatch(getUserPropertiesById(userId));
  }, [dispatch, userId]);
  const { userProperties } = useSelector((store) => store.user);
  return (
    <main>
      <h1 className="text-center p-5">User Properties</h1>
      <section className="d-flex flex-wrap gap-4 container">
        {userProperties.map((property, index) => (
          <PropertyCard property={property} index={index} />
        ))}
      </section>
    </main>
  );
}

export default User;
