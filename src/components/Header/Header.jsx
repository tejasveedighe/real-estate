import classNames from "classnames";
import Cookies from "js-cookie";
import React, { useCallback, useState } from "react";
import { Badge, Button, Dropdown, NavDropdown } from "react-bootstrap";
import { PiBellSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { getUserData, isLoggedIn } from "../../utils/auth";
import styles from "./Header.module.css";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiArrowUpLine,
} from "react-icons/ri";

function Header() {
  const handleSignOut = useCallback(() => {
    Cookies.remove("userToken");
    Cookies.remove("userId");
    Cookies.remove("userName");
    Cookies.remove("userEmail");
    window.location.reload();
  }, []);

  const { userRole: role } = getUserData();
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
          <>
            <Link className={styles.navLink} to="/addProperty">
              Add Property
            </Link>
            <Link className={styles.navLink} to="/manageUsers">
              Manage Users
            </Link>
          </>
        ) : null}

        <Link className={styles.navLink} to="/about">
          About
        </Link>
      </div>

      {isLoggedIn() ? (
        <>
          {role === "Admin" ? (
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
          ) : null}
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
        <Dropdown className={styles.dropdown} title="Login">
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Login
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Divider as={Divider} />
            <div className={styles.listGroup}>
              <Dropdown.Item className={styles.listItem}>
                My Requests
              </Dropdown.Item>
              <Dropdown.Item className={styles.listItem}>
                Contacted Properties
              </Dropdown.Item>
              <Dropdown.Item className={styles.listItem}>
                Viewed Properties
              </Dropdown.Item>
              <Dropdown.Item className={styles.listItem}>
                Searches
              </Dropdown.Item>
            </div>
            <Dropdown.Divider />
            <div className={styles.listGroup}>
              <Dropdown.Item className={styles.listItem}>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item className={styles.listItem}>
                Recommendations
              </Dropdown.Item>
            </div>
            <Dropdown.Divider />
            <div className={styles.listGroup}>
              <Dropdown.Item className={styles.loginItem} type="button">
                Login
              </Dropdown.Item>
              <Dropdown.Item className={styles.signUpItem}>
                New To Konio?
                <Link to="/signup">Sign Up</Link>
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </nav>
  );
}

const Divider = () => {
  return (
    <div className="d-flex align-items-center justify-content-center w-100">
      <span
        style={{
          fontSize: 10,
        }}
      >
        My Activity
      </span>
    </div>
  );
};

const CustomToggle = React.forwardRef(({ children, onClick, onClose }, ref) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked((prev) => !prev);
    onClick(e);
  };

  const handleClose = () => {
    setClicked(false);
    onClose();
  };

  return (
    <a
      className={classNames(styles.dropdownToggle)}
      ref={ref}
      onClick={handleClick}
    >
      {children}
      {clicked ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
      <Dropdown.Menu show={clicked} onClose={handleClose} />
    </a>
  );
});

export default Header;
