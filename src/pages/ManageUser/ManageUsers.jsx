import Cookies from "js-cookie";
import styles from "./ManageUser.module.css";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import { deleteUserById, getAllUsers } from "../../redux/slices/userSlice";
import { Button } from "react-bootstrap";
import AddNewUserModal from "../../components/AddNewUserModal/AddNewUserModal";

function ManageUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, status } = useSelector((store) => store.user);
  const currentUserId = parseInt(Cookies.get("userId"));

  const [filteredUser, setFilteredUsers] = useState([]);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      setFilteredUsers(() => {
        return users?.filter((user) => user.userId !== currentUserId);
      });
    }
  }, [users, currentUserId, loading]);

  const [openAddNewUserModal, setOpenAddNewUserModal] = useState(false);
  const handleAddNewUser = useCallback(() => {
    setOpenAddNewUserModal((prev) => !prev);
  }, []);

  const handleDeleteUser = useCallback(
    (userId) => {
      dispatch(deleteUserById(userId)).then((res) => {
        alert("User was deleted");
        dispatch(getAllUsers());
      });
    },
    [dispatch]
  );

  if (loading) {
    return (
      <main>
        <h1 className="text-center">Manage User</h1>
        <h1 className="text-center">Loading ...</h1>
      </main>
    );
  }

  if (status === "rejected") {
    return (
      <main>
        <h1 className="text-center">Failed To fetch users, try again later</h1>
      </main>
    );
  }
  return (
    <main className="d-flex flex-column align-items-center justify-content-center">
      <div className="d-flex align-items-center">
        <h1 className="text-center p-5 d-inline-block">Manage Users</h1>
        <Button onClick={handleAddNewUser}>Add New User</Button>
      </div>
      <div className={styles.usersGrid}>
        {filteredUser.map((user) => (
          <UserProfileCard
            key={user.userId}
            user={user}
            deleteUser={handleDeleteUser}
          />
        ))}
      </div>
      <AddNewUserModal onHide={handleAddNewUser} show={openAddNewUserModal} />
    </main>
  );
}

export default ManageUser;
