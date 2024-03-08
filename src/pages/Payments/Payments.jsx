import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPayments } from "../../redux/slices/paymentSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import styles from "./Payments.module.css";
import classNames from "classnames";
import { Badge } from "react-bootstrap";

function Payments() {
  const dispatch = useDispatch();
  const { loading, payments } = useSelector((store) => store.payment);

  useEffect(() => {
    dispatch(getAllPayments());
  }, [dispatch]);

  return (
    <main className={classNames("text-center mt-5 container", styles.parent)}>
      <h1>All Transactions</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Property ID</th>
                <th>Seller ID</th>
                <th>Buyer ID</th>
                <th>Price</th>
                <th>Payment Date</th>
                <th>Payment Status</th>
                <th>Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.paymentId}>
                  <td>{payment.paymentId}</td>
                  <td>{payment.propertyId}</td>
                  <td>{payment.sellerId}</td>
                  <td>{payment.buyerId}</td>
                  <td>{payment.price}</td>
                  <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                  <td>
                    <Badge
                      bg={payment.paymentStatus === 1 ? "success" : "danger"}
                    >
                      {payment.paymentStatus === 1 ? "Complete" : "Failed"}
                    </Badge>
                  </td>
                  <td>{payment.paymentType === 0 ? "Buy" : "Rent"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}

export default Payments;
