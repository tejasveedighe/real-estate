import React, { useCallback } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const userId = formData.get("userId");
    console.log("userId:", userId);
    console.log("Username:", username);
    console.log("Password:", password);
  }, []);

  return (
    <main className={styles.loginPage}>
      <section className={styles.formContainer}>
        <form
          onSubmit={onSubmit}
          className="d-flex flex-column align-items-start gap-5"
        >
          <div className="d-flex flex-column align-items-center text-center w-100">
            <h1>Login</h1>
            <span>Enter Login Details to get access</span>
          </div>
          <div className="w-100 d-flex flex-column gap-4">
            <Form.Group className="w-100">
              <Form.Label>User Id</Form.Label>
              <Form.Control
                required
                type="number"
                name="userId"
                placeholder="User Id"
              />
            </Form.Group>
            <Form.Group className="w-100">
              <Form.Label>Username or Email Address</Form.Label>
              <Form.Control
                required
                type="text"
                name="username"
                placeholder="Username / Email Address"
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
            <div className="w-100 d-flex align-content-center justify-content-between">
              <Form.Group className="d-flex gap-2">
                <Form.Check />
                <Form.Label>Keep Me Logged in</Form.Label>
              </Form.Group>
              <Link to="/forgot-password" className="text-decoration-none">
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="w-100 d-flex align-items-center justify-content-between">
            <span>
              Don't have an account? <Link to="/signup">Sign Up</Link> here
            </span>
            <button type="submit" className={styles.loginBtn}>
              Login
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
