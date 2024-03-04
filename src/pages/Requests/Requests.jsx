import React, { useCallback, useEffect, useState } from "react";
import styles from "./Requests.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllContactRequests,
  requestAction,
} from "../../redux/slices/propertySlice";
import { Button } from "react-bootstrap";
import classNames from "classnames";
import { toast } from "react-toastify";

function Requests() {
  const dispatch = useDispatch();

  const { requests, loading } = useSelector((store) => store.properties);

  const [count, setCount] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  const getContacts = useCallback(() => {
    dispatch(getAllContactRequests()).then((res) => {
      const newState = { approved: 0, rejected: 0, pending: 0 };
      for (const request of res.payload) {
        if (request.approvalStatus === 1) newState.pending++;
        else if (request.approvalStatus === 2) newState.approved++;
        else newState.rejected++;
      }
      setCount(newState);
    });
  }, [dispatch]);

  useEffect(getContacts, []);

  const handleRequestAction = useCallback(
    (request, status) => {
      const payload = {
        userId: request.userId,
        propertyId: request.propertyId,
        approvalStatus: status,
      };
      dispatch(requestAction(payload))
        .then(() => {
          toast.success("Action Completed Successfully");
        })
        .then(() => getContacts());
    },
    [dispatch, getContacts]
  );

  return loading ? (
    <main className="text-center container mt-5 fs-1">Loading...</main>
  ) : (
    <main className={classNames("text-center container", styles.parent)}>
      <h1 className="my-5">Requests</h1>
      <div className={styles.featureContainer}>
        <div className={classNames(styles.feature, "rounded border-info")}>
          <span className="badge text-bg-info text-white float-start">All</span>
          <span className={styles.featureNumber}>{requests.length}</span>
        </div>
        <div className={classNames(styles.feature, "rounded border-success")}>
          <span className="badge text-bg-success text-white float-start">
            Approved
          </span>
          <span className={styles.featureNumber}>{count.approved}</span>
        </div>
        <div className={classNames(styles.feature, "rounded border-warning")}>
          <span className="badge text-bg-warning text-white float-start">
            Pending
          </span>
          <span className={styles.featureNumber}>{count.pending}</span>
        </div>
        <div className={classNames(styles.feature, "rounded border-danger")}>
          <span className="badge text-bg-danger text-white float-start">
            Rejected
          </span>
          <span className={styles.featureNumber}>{count.rejected}</span>
        </div>
      </div>
      <div className={styles.filterContainer}>
        <select multiple>
          <option>1</option>
          <option>1</option>
          <option>1</option>
          <option>1</option>
        </select>
      </div>
      <div className={classNames(styles.tableContainer)}>
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
                  <span
                    className={classNames("badge rounded-pill", {
                      "bg-warning text-white": request.approvalStatus === 1,
                      "bg-success text-white": request.approvalStatus === 2,
                      "bg-danger text-white":
                        request.approvalStatus !== 1 &&
                        request.approvalStatus !== 2,
                    })}
                  >
                    {request.approvalStatus === 1
                      ? "Pending"
                      : request.approvalStatus === 2
                      ? "Approved"
                      : "Rejected"}
                  </span>
                </td>

                <td>
                  {request.approvalStatus === 1 && (
                    <>
                      <Button
                        className="text-white"
                        type="button"
                        onClick={() => handleRequestAction(request, 2)}
                      >
                        Approve
                      </Button>
                      <Button
                        className="text-white"
                        variant="danger"
                        type="button"
                        onClick={() => handleRequestAction(request, 3)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {request.approvalStatus !== 1 && (
                    <Button className="text-white" variant="info" type="button">
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
