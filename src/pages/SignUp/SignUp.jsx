import React, { useCallback } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/slices/userSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const repassword = formData.get("re-password");

      if (password !== repassword) {
        alert("Passwords do not match");
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      console.log(name);
      console.log(email);
      console.log(password);
      console.log(repassword);

      dispatch(
        signupUser({
          name,
          email,
          password,
          userId: 1,
          userType: "Admin",
        })
      )
        .then((res) => {
          if (res.type === "user/signup/fulfilled") {
            navigate("/login");
          }
        })
        .catch((err) => alert(err.message));
    },
    [dispatch, navigate]
  );
  return (
    <main className={styles.loginPage}>
      <section className={styles.formContainer}>
        <form
          onSubmit={onSubmit}
          className="d-flex flex-column align-items-start gap-5"
        >
          <div className="d-flex flex-column align-items-center text-center w-100">
            <h1>Sign Up</h1>
            <span>Create Account to get access</span>
          </div>
          <div className="w-100 d-flex flex-column gap-4">
            <Form.Group className="w-100">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                placeholder="Your Full Name"
              />
            </Form.Group>
            <Form.Group className="w-100">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="mail"
                name="email"
                placeholder="Email Address"
              />
            </Form.Group>
            <Form.Group className="w-100">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Enter Password"
              />
            </Form.Group>
            <Form.Group className="w-100">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="re-password"
                placeholder="Enter Password Again"
              />
            </Form.Group>
          </div>
          <div className="w-100 d-flex align-items-center justify-content-between">
            <span>
              Already have an account? <Link to="/login">Login</Link> here
            </span>
            <button type="submit" className={styles.loginBtn}>
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default SignUp;
