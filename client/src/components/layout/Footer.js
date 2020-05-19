import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const title = process.env.REACT_APP_NAME;
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <footer className="footer p-4 mt-auto">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-3 col-sm-12 my-1 text-center">
              <Link to="/about">About</Link>
            </div>
            <div className="col-md-3 col-sm-12 my-1 text-center">
              <Link to="/terms-conditions">Terms and Conditions</Link>
            </div>
            <div className="col-md-3 col-sm-12 my-1 text-center">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
            <div className="col-md-3 col-sm-12 my-1 text-center">
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <p className="text-center my-3 mb-0">
            <small className="text-secondary">Copyright @ {year} | </small>
            <Link className="brand" to="/">
              {title}
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
