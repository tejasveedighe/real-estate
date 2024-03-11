import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  getAllContactRequests,
  requestAction,
} from "../../redux/slices/propertySlice";
import styles from "./Requests.module.css";

function Requests() {
  const dispatch = useDispatch();

  const { requests, loading } = useSelector((store) => store.properties);

  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");

  const [uniquePropertyTitles, setPropertyTitles] = useState([]);
  const [uniqueUsernames, setUsernames] = useState([]);

  const [count, setCount] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
  });
  // Function to extract unique property titles with property IDs
  const getUniquePropertyTitles = useCallback(() => {
    if (!requests) return;
    const uniquePropertyTitles = {};
    for (const request of requests) {
      uniquePropertyTitles[request.propertyTitle] = request.propertyId;
    }
    setPropertyTitles(uniquePropertyTitles);
  }, [requests]);

  // Function to extract unique usernames with user IDs
  const getUniqueUsernames = useCallback(() => {
    if (!requests) return;
    const uniqueUsernames = {};
    for (const request of requests) {
      uniqueUsernames[request.username] = request.userId;
    }
    setUsernames(uniqueUsernames);
  }, [requests]);

  const filterRequests = useCallback(() => {
    if (!requests) return;
    let filtered = [...requests];

    // Filter by user
    if (selectedUser) {
      filtered = filtered.filter(
        (request) => request.username === selectedUser
      );
    }

    // Filter by approval status
    if (selectedApprovalStatus) {
      const status = selectedApprovalStatus.toLowerCase();
      filtered = filtered.filter((request) => {
        if (status === "pending") return request.approvalStatus === 1;
        if (status === "approved") return request.approvalStatus === 2;
        if (status === "rejected")
          return request.approvalStatus !== 1 && request.approvalStatus !== 2;
        return true;
      });
    }

    // Filter by property
    if (selectedProperty) {
      filtered = filtered.filter(
        (request) => request.propertyTitle === selectedProperty
      );
    }

    setFilteredRequests(filtered);
  }, [requests, selectedUser, selectedApprovalStatus, selectedProperty]);

  const getContacts = useCallback(() => {
    dispatch(getAllContactRequests()).then((res) => {
      const newState = { approved: 0, rejected: 0, pending: 0 };
      for (const request of res.payload) {
        if (request.approvalStatus === 1) newState.pending++;
        else if (request.approvalStatus === 2) newState.approved++;
        else if (request.approvalStatus === 3) newState.rejected++;
      }
      setCount(newState);
    });
    filterRequests();
  }, [dispatch, filterRequests]);

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

  const handleUserChange = useCallback(
    (event) => {
      setSelectedUser(event.target.value);
      filterRequests();
    },
    [filterRequests]
  );

  const handleApprovalStatusChange = useCallback(
    (event) => {
      setSelectedApprovalStatus(event.target.value);
      filterRequests();
    },
    [filterRequests]
  );

  const handlePropertyChange = useCallback(
    (event) => {
      setSelectedProperty(event.target.value);
      filterRequests();
    },
    [filterRequests]
  );

  useEffect(() => {
    filterRequests();
  }, [
    filterRequests,
    requests,
    selectedApprovalStatus,
    selectedProperty,
    selectedUser,
  ]);

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    getUniqueUsernames();
    getUniquePropertyTitles();
  }, [requests]);

  return loading ? (
    <main className="text-center container mt-5 fs-1">
      <h1 className="my-5">Requests</h1>
      <LoadingSpinner />
    </main>
  ) : (
    <main className={classNames("text-center container", styles.parent)}>
      <h1 className="my-5">Requests</h1>
      <Features requests={requests} count={count} />

      <div className={classNames(styles.filterContainer, "rounded")}>
        {/* User Select Dropdown */}
        <div>
          <p>User</p>
          <select value={selectedUser} onChange={handleUserChange}>
            <option value="">All Users</option>
            {Object.keys(uniqueUsernames).map((username, index) => (
              <option key={`${username}`} value={username}>
                {username}
              </option>
            ))}
          </select>
        </div>

        {/* Property Select Dropdown */}
        <div>
          <p>Property</p>
          <select value={selectedProperty} onChange={handlePropertyChange}>
            <option value="">All Properties</option>
            {Object.keys(uniquePropertyTitles).map((title, index) => (
              <option key={`${title}`} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        {/* Approval Status Select Dropdown */}
        <div>
          <p>Status</p>
          <select
            value={selectedApprovalStatus}
            onChange={handleApprovalStatusChange}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <PaginatedTable
        filteredRequests={filteredRequests}
        handleRequestAction={handleRequestAction}
      />
    </main>
  );
}

export default Requests;

function Features({ requests, count }) {
  return (
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
  );
}

function PaginatedTable({ filteredRequests, handleRequestAction }) {
  const itemsPerPage = 10;
  const itemOffset = 0;
  const [currentPage, setCurrentPage] = useState(0);
  const endOffSet = itemOffset + itemsPerPage;
  const currentItems = filteredRequests.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const pageCount = Math.ceil(filteredRequests.length / endOffSet);

  return (
    <div className={classNames(styles.tableContainer)}>
      {currentItems?.length ? (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Property</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Updated On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((request, index) => (
                <tr key={uuid()}>
                  <td>{index + 1}</td>
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
                    {
                      new Date(request.createdOn)
                        .toLocaleString("en-GB")
                        .split(",")[0]
                    }
                  </td>
                  <td>
                    {request.updatedOn
                      ? new Date(request.updatedOn)
                          .toLocaleString("en-GB")
                          .split(",")[0]
                      : "-"}
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
                    {request.approvalStatus === 2 && (
                      <Button
                        className="text-white"
                        variant="danger"
                        type="button"
                        onClick={() => handleRequestAction(request, 3)}
                      >
                        Dis-Approve
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <PaginationContainer
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
            currentePage={currentPage}
          />
        </>
      ) : (
        <div>No Data Found</div>
      )}
    </div>
  );
}
function PaginationContainer({ setCurrentPage, pageCount, currentPage }) {
  return (
    <div className={styles.paginationContainer}>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li
            class="page-item"
            onClick={() =>
              setCurrentPage((prev) => {
                if (prev > 0) {
                  return prev - 1;
                }
                return prev;
              })
            }
          >
            <a class="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {[...Array(pageCount)].map((_, index) => (
            <li
              key={uuid()}
              className={classNames(
                "page-link",
                currentPage === index ? "active" : ""
              )}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </li>
          ))}
          <li
            class="page-item"
            onClick={() =>
              setCurrentPage((prev) => {
                if (prev === pageCount - 1) {
                  return 0;
                }
                return prev + 1;
              })
            }
          >
            <a class="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
