import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register, checkUser } from "../../actions/auth";
import PropTypes from "prop-types";
import InputGroup from "../common/InputGroup";
import { Form, Button, Alert } from "reactstrap";
import isEmpty from "../../utils/isEmpty";

const Register = ({ register, isAuthenticated, errors, checkUser }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const onChange = e =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const { name, email, password, password2 } = registerData;
    register({ name, email, password, password2 });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="box-center">
        <h2 className="mb-3 title">Create your account</h2>
        <Form onSubmit={e => onSubmit(e)} className="box-center-form">
          {!isEmpty(errors) && <Alert color="danger">{errors.message}</Alert>}
          <InputGroup
            type="text"
            name="name"
            label="Name"
            id="name"
            onChange={e => onChange(e)}
            error={errors}
          />
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
          <InputGroup
            type="password"
            name="password2"
            label="Confirm Password"
            id="password2"
            onChange={e => onChange(e)}
            error={errors}
          />
          <Button type="submit" block color="primary" size="lg">
            Create account
          </Button>
          <p className="mt-2 mb-1">
            <Link to="/login">Already have an account? Sign In</Link>
          </p>
        </Form>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors
});

export default connect(mapStateToProps, { setAlert, register, checkUser })(
  Register
);
