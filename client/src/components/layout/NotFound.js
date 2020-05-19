import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="card mb-4 mt-4">
      <div className="card-body">
        <h2 className="x-large">
          <i className="fas fa-exclamation-triangle" /> Page Not Found
        </h2>
        <p className="large">Sorry, this page does not exist</p>

        <Link to="/" className="btn btn-primary btn-sm mr-2">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
