import classNames from "classnames";
import Cookies from "js-cookie";
import React, { useCallback } from "react";
import { Badge, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isLoggedIn, useUserRole } from "../../utils/auth";
import styles from "./Header.module.css";
import { PiBellSimpleBold } from "react-icons/pi";

function Header() {
  const handleSignOut = useCallback(() => {
    Cookies.remove("userToken");
    Cookies.remove("userId");
    Cookies.remove("userName");
    Cookies.remove("userEmail");
    window.location.reload();
  }, []);

  const role = useUserRole();
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

        {role === "Admin" ? (
          <Link className={styles.navLink} to="/addProperty">
            Add Property
          </Link>
        ) : null}

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
        {isLoggedIn() ? (
          <>
            <div className={styles.navLink}>
              <Dropdown>
                <Dropdown.Toggle className="bg-none">
                  <PiBellSimpleBold /> <Badge>{null}</Badge>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link
                      to="/requests"
                      className="text-black text-decoration-none"
                    >
                      You have {} requests pending click here to check
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Dropdown>
              <Dropdown.Toggle>{Cookies.get("userName")}</Dropdown.Toggle>
              <Dropdown.Menu>
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
          </>
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
