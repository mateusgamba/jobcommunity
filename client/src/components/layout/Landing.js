import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Jumbotron, Container } from "reactstrap";

const Landing = ({ isAuthenticated }) => {
  const title = process.env.REACT_APP_NAME;
  const description = process.env.REACT_APP_DESCRIPTION;

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <Jumbotron
        className="jumbotron-background d-flex flex-safari align-content-center flex-wrap"
        fluid
      >
        <Container>
          <h2 className="text-white">{title}</h2>
          <p className="lead text-white">{description}</p>
          <Link to="/profiles" className="btn btn-light btn-lg">
            <i className="fas fa-search"></i>
            <span>Find a Developer</span>
          </Link>
        </Container>
      </Jumbotron>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
