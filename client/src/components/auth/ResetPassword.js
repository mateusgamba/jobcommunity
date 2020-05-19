import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { resetPassword, checkUser } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputGroup from "../common/InputGroup";
import { Form, Button, Alert } from "reactstrap";
import isEmpty from "../../utils/isEmpty";

const ResetPassword = ({
  resetPassword,
  isAuthenticated,
  errors,
  checkUser,
  match
}) => {
  let { hash } = match.params;

  const [resetData, setResetData] = useState({
    password: "",
    password2: ""
  });

  const { password, password2 } = resetData;

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const onChange = e =>
    setResetData({ ...resetData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    resetPassword({ password, password2, reset: hash });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="box-center">
        <h2 className="mb-3 title">Reset your password</h2>
        <Form onSubmit={e => onSubmit(e)} className="box-center-form">
          {!isEmpty(errors) && <Alert color="danger">1{errors.message}</Alert>}
          <InputGroup
            type="password"
            name="password"
            label="New password"
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
            Update
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors
});

export default connect(mapStateToProps, { resetPassword, checkUser })(
  ResetPassword
);
