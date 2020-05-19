import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import InputGroup from "../common/InputGroup";
import CheckboxGroup from "../common/CheckboxGroup";
import { Button, Alert } from "reactstrap";
import isEmpty from "../../utils/isEmpty";

const AddEducation = ({ addEducation, history, errors }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { current } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeCheckbox = () => {
    setFormData({
      ...formData,
      current: !current,
      to: !current ? "" : formData.to
    });
    toggleDisabled(!toDateDisabled);
  };

  const onSubmit = e => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <Fragment>
      <h2 className="my-3 title">Add an Education</h2>

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
              type="text"
              name="school"
              label="School (eg. University of Oxford)"
              id="school"
              onChange={e => onChange(e)}
              error={errors}
            />

            <InputGroup
              type="text"
              name="degree"
              label="Degree or Certificate (eg. Bachelor’s)"
              id="degree"
              onChange={e => onChange(e)}
              error={errors}
            />

            <InputGroup
              type="text"
              name="fieldofstudy"
              label="Field of Study (eg. Computer Science)"
              id="fieldofstudy"
              onChange={e => onChange(e)}
              error={errors}
            />

            <div className="row">
              <div className="col-6 col-sm-4">
                <InputGroup
                  type="date"
                  name="from"
                  label="Start Date"
                  id="from"
                  onChange={e => onChange(e)}
                  error={errors}
                />
              </div>

              <div className="col-6 col-sm-4">
                <CheckboxGroup
                  type="checkbox"
                  id="current"
                  name="current"
                  label="Current School"
                  checked={current}
                  value={current}
                  onChange={() => onChangeCheckbox()}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-sm-4">
                <InputGroup
                  type="date"
                  name="to"
                  label="End Date"
                  id="to"
                  onChange={e => onChange(e)}
                  disabled={toDateDisabled ? "disabled" : ""}
                  error={errors}
                  value={formData.to}
                />
              </div>
            </div>

            <InputGroup
              type="textarea"
              name="description"
              label="Program Description"
              id="description"
              onChange={e => onChange(e)}
              style={{ height: "100px" }}
            />

            <Button color="primary" type="submit" size="lg" className="px-5">
              Save
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.profile.errors
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
