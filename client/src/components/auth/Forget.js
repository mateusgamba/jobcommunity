import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { forget, checkUser } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputGroup from "../common/InputGroup";
import { Form, Button, Alert } from "reactstrap";
import isEmpty from "../../utils/isEmpty";

const Forget = ({
  forget,
  isAuthenticated,
  errors,
  successMessage,
  checkUser
}) => {
  const [email, setEmail] = useState();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const onChange = e => setEmail(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    forget({ email });
    setEmail("");
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="box-center">
        <h2 className="mb-3 title">Forgot your password</h2>
        <Form onSubmit={e => onSubmit(e)} className="box-center-form">
          {!isEmpty(errors) && <Alert color="danger">{errors.message}</Alert>}
          {!isEmpty(successMessage) && (
            <Alert color="success">{successMessage}</Alert>
          )}
          <InputGroup
            type="text"
            name="email"
            label="Enter your user account's verified email address and we will send you a password reset link."
            id="email"
            placeholder="Inform your Email"
            onChange={e => onChange(e)}
            error={errors}
            value={email}
          />
          <Button type="submit" block color="primary" size="lg">
            Send password reset email
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

Forget.propTypes = {
  forget: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
  successMessage: state.auth.successMessage
});

export default connect(mapStateToProps, { forget, checkUser })(Forget);
