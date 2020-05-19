import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { getProfessionalAreas } from "../../actions/professionalArea";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { Button, Alert } from "reactstrap";
import isEmpty from "../../utils/isEmpty";

const EditProfile = ({
  profile: { profile },
  createProfile,
  getCurrentProfile,
  history,
  errorsEdit,
  getProfessionalAreas,
  professionalArea: { professionalAreas },
}) => {
  const selectProfessionalAreaValue = [
    { label: "Select Professional area", value: "" },
  ];
  const [professionalAreaData, setProfessionalAreaData] = useState(
    selectProfessionalAreaValue
  );
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
  const effectHasRunRef = useRef(false);

  useEffect(() => {
    getCurrentProfile();
    getProfessionalAreas();
  }, [getCurrentProfile, getProfessionalAreas]);

  useEffect(() => {
    if (profile !== undefined && profile !== null) {
      let twitter = "";
      let facebook = "";
      let linkedin = "";
      let youtube = "";
      let instagram = "";

      if (profile.social !== null && profile.social !== undefined) {
        twitter = !profile.social.twitter ? "" : profile.social.twitter;
        facebook = !profile.social.facebook ? "" : profile.social.facebook;
        linkedin = !profile.social.linkedin ? "" : profile.social.linkedin;
        youtube = !profile.social.youtube ? "" : profile.social.youtube;
        instagram = !profile.social.instagram ? "" : profile.social.instagram;
      }

      setFormData({
        company: !profile.company ? "" : profile.company,
        website: !profile.website ? "" : profile.website,
        location: !profile.location ? "" : profile.location,
        status: !profile.status ? "" : profile.status,
        skills: !profile.skills ? "" : profile.skills.join(","),
        githubusername: !profile.githubusername ? "" : profile.githubusername,
        bio: !profile.bio ? "" : profile.bio,
        whatsapp: !profile.whatsapp ? "" : profile.whatsapp,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
      });
    }
  }, [profile]);

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
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    whatsapp,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h2 className="my-3 title">Edit your Profile</h2>

      <div className="row no-gutters">
        <div className="col-md-12 pl-0">
          <Link to="/dashboard" className="btn btn-light mb-2 pl-1">
            <i className="fas fa-chevron-circle-left"></i> Go back
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          {!isEmpty(errorsEdit) && (
            <Alert color="danger">{errorsEdit.message}</Alert>
          )}

          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <SelectListGroup
              label="Current Professional Status"
              name="status"
              id="status"
              onChange={(e) => onChange(e)}
              options={professionalAreaData}
              value={status}
              error={errorsEdit}
            />
            <InputGroup
              type="text"
              name="company"
              label="Current company"
              id="company"
              onChange={(e) => onChange(e)}
              error={errorsEdit}
              value={company}
            />
            <InputGroup
              type="text"
              name="website"
              label="Website"
              id="website"
              value={website}
              error={errorsEdit}
              onChange={(e) => onChange(e)}
            />
            <InputGroup
              type="text"
              name="location"
              label="Country and city (eg. United Kingdom, London)"
              id="location"
              onChange={(e) => onChange(e)}
              error={errorsEdit}
              value={location}
            />
            <InputGroup
              type="text"
              name="skills"
              label="Skills (eg. HTML,CSS,JavaScript,PHP)"
              id="skills"
              onChange={(e) => onChange(e)}
              error={errorsEdit}
              value={skills}
            />
            <InputGroup
              type="textarea"
              name="bio"
              label="Tell us a little about yourself"
              id="bio"
              value={bio}
              onChange={(e) => onChange(e)}
              style={{ height: "100px" }}
              error={errorsEdit}
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
              value={whatsapp}
              error={errorsEdit}
            />

            <hr className="my-4" />
            <h5 className="mb-3">Social Network Links</h5>
            <InputGroup
              type="text"
              name="githubusername"
              label="Github URL"
              id="githubusername"
              onChange={(e) => onChange(e)}
              value={githubusername}
              error={errorsEdit}
            />
            <InputGroup
              type="text"
              name="twitter"
              label="Twitter URL"
              id="twitter"
              value={twitter}
              onChange={(e) => onChange(e)}
            />
            <InputGroup
              type="text"
              name="facebook"
              label="Facebook URL"
              id="facebook"
              value={facebook}
              onChange={(e) => onChange(e)}
            />
            <InputGroup
              type="text"
              name="youtube"
              label="YouTube URL"
              id="youtube"
              value={youtube}
              onChange={(e) => onChange(e)}
            />

            <InputGroup
              type="text"
              name="linkedin"
              label="Linkedin URL"
              id="linkedin"
              value={linkedin}
              onChange={(e) => onChange(e)}
            />

            <InputGroup
              type="text"
              name="instagram"
              label="Instagram URL"
              id="instagram"
              value={instagram}
              onChange={(e) => onChange(e)}
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getProfessionalAreas: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  professionalArea: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errorsEdit: state.profile.errorsEdit,
  professionalArea: state.professionalArea,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  getProfessionalAreas,
})(withRouter(EditProfile));
