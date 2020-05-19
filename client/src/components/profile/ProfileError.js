import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

const ProfileError = ({ message }) => (
  <Container className="mt-4">
    <div className="row no-gutters">
      <div className="col-md-12 pl-0">
        <Link to="/profiles" className="btn btn-light mb-2 pl-1">
          <i className="fas fa-chevron-circle-left"></i> Back to developers
        </Link>
      </div>
    </div>
    <div className="card mb-4">
      <div className="card-body text-content">
        <p>{message}</p>
      </div>
    </div>
  </Container>
);

ProfileError.propTypes = {
  message: PropTypes.object.isRequired
};

export default ProfileError;
