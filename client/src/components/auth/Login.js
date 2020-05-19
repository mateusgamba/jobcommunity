import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, checkUser } from "../../actions/auth";
import InputGroup from "../common/InputGroup";
import { Form, Button, Alert } from "reactstrap";
import isEmpty from "../../utils/isEmpty";

const Login = ({ login, isAuthenticated, errors, checkUser }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const onChange = e =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const { email, password } = loginData;
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="box-center">
        <h2 className="mb-3 title">Please sign in</h2>
        <Form onSubmit={e => onSubmit(e)} className="box-center-form">
          {!isEmpty(errors) && <Alert color="danger">{errors.message}</Alert>}
          <InputGroup
            type="email"
            name="email"
            label="Email address"
            id="email"
            onChange={e => onChange(e)}
            error={errors}
          />
          <InputGroup
            type="password"
            name="password"
            label="Password"
            id="password"
            onChange={e => onChange(e)}
            error={errors}
          />
          <Button type="submit" block color="primary" size="lg">
            Sign in
          </Button>
          <p className="mt-2 mb-1">
            <Link to="/forget">Forgot Password?</Link>
          </p>
          <p className="mb-0">
            <Link to="/register">New user? Create a new account</Link>
          </p>
        </Form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors
});

export default connect(mapStateToProps, { login, checkUser })(Login);
