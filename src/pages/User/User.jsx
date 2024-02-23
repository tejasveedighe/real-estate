import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../redux/slices/userSlice";

function User() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);
  return (
    <main>
      <h1 className="text-center p-5">User Profile</h1>
    </main>
  );
}

export default User;
