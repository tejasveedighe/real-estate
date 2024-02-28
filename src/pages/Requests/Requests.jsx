import React, { useEffect } from "react";
import styles from "./Requests.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllContactRequests } from "../../redux/slices/propertySlice";
import { Button } from "react-bootstrap";

function Requests() {
  const dispatch = useDispatch();

  const { requests, loading } = useSelector((store) => store.properties);

  useEffect(() => {
    dispatch(getAllContactRequests());
  }, [dispatch]);

  return loading ? (
    <main className="text-center container mt-5 fs-1">Loading...</main>
  ) : (
    <main className="text-center">
      <h1 className="my-5">Requests</h1>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Property</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.userId}>
                <td>{request.propertyId}</td>
                <td>{request.username}</td>
                <td>{request.propertyTitle}</td>
                <td>
                  {request.approvalStatus === 1
                    ? "Pending"
                    : request.approvalStatus === 2
                    ? "Approved"
                    : "Rejected"}
                </td>
                <td>
                  {request.approvalStatus === 1 && (
                    <>
                      <Button
                        type="button"
                        // onClick={() =>
                        //   dispatch(
                        //     handleAction(request.propertyId, "Approve")
                        //   )
                        // }
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        type="button"
                        // onClick={() =>
                        //   dispatch(handleAction(request.propertyId, "Reject"))
                        // }
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {request.approvalStatus !== 1 && (
                    <Button variant="info" type="button">
                      View
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Requests;
