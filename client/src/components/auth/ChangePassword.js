import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputGroup from "../common/InputGroup";
import { Button, Alert } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { updatePassword, clearErrors } from "../../actions/auth";
import isEmpty from "../../utils/isEmpty";

const ChangePassword = ({ updatePassword, clearErrors, history, errors }) => {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirm: ""
  });

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updatePassword(formData, history);
  };

  return (
    <Fragment>
      <h2 className="my-3 title">Change your password</h2>

      <div className="row no-gutters">
        <div className="col-md-12 pl-0">
          <Link to="/dashboard" className="btn btn-light mb-2 pl-1">
            <i className="fas fa-chevron-circle-left"></i> Back to dashboard
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          {!isEmpty(errors) && <Alert color="danger">{errors.message}</Alert>}

          <form className="form" onSubmit={e => onSubmit(e)}>
            <InputGroup
              type="password"
              name="password"
              label="Current password"
              id="password"
              onChange={e => onChange(e)}
              error={errors}
            />
            <InputGroup
              type="password"
              name="newPassword"
              label="New password"
              id="newPassword"
              onChange={e => onChange(e)}
              error={errors}
            />
            <InputGroup
              type="password"
              name="newPasswordConfirm"
              label="Confirm New password"
              id="newPasswordConfirm"
              onChange={e => onChange(e)}
              error={errors}
            />

            <Button color="primary" type="submit" size="lg" className="px-5">
              Change
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

ChangePassword.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.auth.errors
});

export default connect(mapStateToProps, { updatePassword, clearErrors })(
  withRouter(ChangePassword)
);
