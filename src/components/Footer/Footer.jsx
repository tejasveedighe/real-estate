import React from "react";
import styles from "./Footer.module.css";
import classNames from "classnames";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={classNames("container-fluid", styles.footer)}>
      <div className="d-flex align-items-start justify-content-center gap-5">
        <div
          className={classNames(
            "d-flex flex-column align-items-start gap-4",
            styles.brandContainer
          )}
        >
          <img
            width={150}
            src="https://preview.colorlib.com/theme/konato/assets/img/logo/logo2_footer.png"
            alt="logo"
          />
          <span className="text-wrap">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <span className="d-flex align-items-center justify-content-start gap-4">
            <FaInstagram />
            <FaFacebook />
            <FaLinkedin />
            <FaYoutube />
          </span>
        </div>
        <div
          className={classNames(
            "d-flex align-items-start flex-column",
            styles.navGroup
          )}
        >
          <h5>Navigation</h5>
          <span className="d-flex align-items-start flex-column">
            <Link>Home</Link>
            <Link>About</Link>
            <Link>Services</Link>
            <Link>Blog</Link>
            <Link>Contact</Link>
          </span>
        </div>
        <div
          className={classNames(
            "d-flex align-items-start flex-column",
            styles.navGroup
          )}
        >
          <h5>Services</h5>
          <span className="d-flex align-items-start flex-column">
            <Link>Drone Mapping</Link>
            <Link>Real State</Link>
            <Link>Commerical</Link>
            <Link>Construction</Link>
          </span>
        </div>
        <div
          className={classNames(
            "d-flex align-items-start flex-column",
            styles.navGroup
          )}
        >
          <h5>Support</h5>
          <span className="d-flex align-items-start flex-column">
            <Link>Drone Mapping</Link>
            <Link>Real State</Link>
            <Link>Commerical</Link>
            <Link>Construction</Link>
          </span>
        </div>
        <div
          className={classNames(
            "d-flex align-items-start flex-column",
            styles.navGroup
          )}
        >
          <h5>Contact Us</h5>
          <span className="d-flex align-items-start flex-column">
            <Link>Drone Mapping</Link>
            <a href="mail:contact@konato.com">contact@konato.com</a>
            <a href="phone:1087738-3940">10(87)738-3940</a>
          </span>
        </div>
      </div>
      <div className={classNames("", styles.copyright)}>
        <span>Copyright ©2024 All rights reserved</span>
      </div>
    </footer>
  );
}

export default Footer;
