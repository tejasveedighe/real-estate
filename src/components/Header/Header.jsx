import React, { useCallback, useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Cookies from "js-cookie";

function Header() {
  const handleSignOut = useCallback(() => {
    Cookies.remove("userToken");
    Cookies.remove("userId");
    Cookies.remove("userName");
    Cookies.remove("userEmail");
    window.location.reload();
  }, []);

  return (
    <nav
      className={classNames(
        "d-flex align-items-center justify-content-around sticky-top",
        styles.navbar
      )}
    >
      <div className="d-flex align-items-center justify-content-center gap-5">
        <Link to="/" className={styles.navLink}>
          <img
            src="https://preview.colorlib.com/theme/konato/assets/img/logo/logo.png"
            alt="Logo"
          />
        </Link>
        <Link className={styles.navLink} to="/">
          Home
        </Link>

        <Link className={styles.navLink} to="/property">
          Properties
        </Link>

        <Link className={styles.navLink} to="/about">
          About
        </Link>

        <Link className={styles.navLink} to="/blog">
          Blog
        </Link>

        <Link className={styles.navLink} to="/contact">
          Contact
        </Link>
      </div>
      <div className="d-flex align-items-center justify-content-center gap-4">
        <div className={styles.navLink}>
          Call Us :
          <a className={styles.navLink} href="tel:+10 (78) 356 3276">
            +10 (78) 356 3276
          </a>
        </div>
        {Cookies.get("userToken") ? (
          <Dropdown>
            <Dropdown.Toggle>{Cookies.get("userName")}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Button variant="success" className="w-100">
                  <Link
                    to="/profile"
                    className="text-decoration-none text-black text-center text-white"
                  >
                    Profile
                  </Link>
                </Button>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button
                  variant="danger"
                  className="w-100"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link className={styles.navLink} to="/login">
            <Button className={styles.signinBtn} variant="primary">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
