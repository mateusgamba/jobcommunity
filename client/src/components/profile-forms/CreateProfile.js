import React, { useState, useEffect, useRef, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import { getProfessionalAreas } from "../../actions/professionalArea";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { Button, Alert } from "reactstrap";
import isEmpty from "../../utils/isEmpty";

const CreateProfile = ({
  createProfile,
  history,
  errors,
  getProfessionalAreas,
  professionalArea: { professionalAreas },
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    whatsapp: "",
  });
  const selectProfessionalAreaValue = [
    { label: "Select Professional area", value: "" },
  ];
  const [professionalAreaData, setProfessionalAreaData] = useState(
    selectProfessionalAreaValue
  );
  const effectHasRunRef = useRef(false);

  useEffect(() => {
    getProfessionalAreas();
  }, [getProfessionalAreas]);

  useEffect(() => {
    if (
      !effectHasRunRef.current &&
      professionalAreas !== null &&
      professionalAreas !== undefined
    ) {
      effectHasRunRef.current = true;
      setProfessionalAreaData([
        ...selectProfessionalAreaValue,
        ...professionalAreas,
      ]);
    }
  }, [professionalAreas, selectProfessionalAreaValue]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h2 className="my-3 title">
        You have not yet setup a profile, please add some info
      </h2>

      <div className="card mb-4">
        <div className="card-body">
          {!isEmpty(errors) && <Alert color="danger">{errors.message}</Alert>}
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <SelectListGroup
              label="Current Professional Status"
              name="status"
              id="status"
              onChange={(e) => onChange(e)}
              options={professionalAreaData}
              value={formData.status}
              error={errors}
            />
            <InputGroup
              type="text"
              name="company"
              label="Current company"
              id="company"
              onChange={(e) => onChange(e)}
              error={errors}
            />
            <InputGroup
              type="text"
              name="website"
              label="Website"
              id="website"
              onChange={(e) => onChange(e)}
              error={errors}
            />
            <InputGroup
              type="text"
              name="location"
              label="Country and city (eg. United Kingdom, London)"
              id="location"
              onChange={(e) => onChange(e)}
              error={errors}
            />
            <InputGroup
              type="text"
              name="skills"
              label="Skills (eg. HTML,CSS,JavaScript,PHP)"
              id="skills"
              onChange={(e) => onChange(e)}
              error={errors}
            />
            <InputGroup
              type="textarea"
              name="bio"
              label="Tell us a little about yourself"
              id="bio"
              onChange={(e) => onChange(e)}
              style={{ height: "100px" }}
            />
            <hr className="my-4" />
            <h5 className="mb-3">Contact</h5>
            <InputGroup
              type="text"
              name="whatsapp"
              label="Whatsapp"
              id="whatsapp"
              placeholder="+55 123456 1234"
              onChange={(e) => onChange(e)}
            />
            <hr className="my-4" />
            <h5>Social Network Links</h5>
            <InputGroup
              type="text"
              name="githubusername"
              label="Github URL"
              id="githubusername"
              onChange={(e) => onChange(e)}
            />
            <InputGroup
              type="text"
              name="twitter"
              label="Twitter URL"
              id="twitter"
              onChange={(e) => onChange(e)}
            />
            <InputGroup
              type="text"
              name="facebook"
              label="Facebook URL"
              id="facebook"
              onChange={(e) => onChange(e)}
            />
            <InputGroup
              type="text"
              name="youtube"
              label="YouTube URL"
              id="youtube"
              onChange={(e) => onChange(e)}
            />
            <InputGroup
              type="text"
              name="linkedin"
              label="Linkedin URL"
              id="linkedin"
              onChange={(e) => onChange(e)}
            />
            <InputGroup
              type="text"
              name="instagram"
              label="Instagram URL"
              id="instagram"
              onChange={(e) => onChange(e)}
            />

            <Button color="primary" type="submit" size="lg" className="px-5">
              Create Profile
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfessionalAreas: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.profile.errors,
  professionalArea: state.professionalArea,
});

export default connect(mapStateToProps, {
  createProfile,
  getProfessionalAreas,
})(withRouter(CreateProfile));
