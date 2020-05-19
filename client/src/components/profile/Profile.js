import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileSkill from "./ProfileSkill";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileError from "./ProfileError";
import ProfileContact from "./ProfileContact";
import { getProfileById } from "../../actions/profile";
import { Container } from "reactstrap";
import isEmpty from "../../utils/isEmpty";

const Profile = ({
  getProfileById,
  profile: { profile, loading, error },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  const enableEdit = () => {
    return (
      auth.isAuthenticated &&
      auth.loading === false &&
      auth.user._id === profile.user._id
    );
  };

  if (!isEmpty(error)) {
    return <ProfileError message={error.msg} />;
  }

  return (profile === null && isEmpty(error)) || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <ProfileTop profile={profile} auth={enableEdit()} />

      <Container>
        <div className="row no-gutters">
          <div className="col-md-12 pl-0">
            <Link to="/profiles" className="btn btn-light mb-2 pl-1">
              <i className="fas fa-chevron-circle-left"></i> Back to developers
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-8 col-lg-9 order-2 order-sm-2 order-md-1">
            {!isEmpty(profile.bio) && <ProfileAbout profile={profile} />}

            {!isEmpty(profile.skills) && <ProfileSkill profile={profile} />}

            {!isEmpty(profile.experience) && (
              <Fragment>
                <h2 className="mb-3 title">Experience</h2>
                <div className="card mb-4">
                  <div className="card-body">
                    {profile.experience.map((experience, index) => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </Fragment>
            )}

            {!isEmpty(profile.education) && (
              <Fragment>
                <h2 className="mb-3 title">Education</h2>
                <div className="card mb-4">
                  <div className="card-body">
                    {profile.education.map((education, index) => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </Fragment>
            )}
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 order-1 order-sm-1 order-md-2">
            {!isEmpty(profile.user) && (
              <ProfileContact
                name={`${profile.user.name}`}
                email={`${profile.user.email}`}
                handle={profile.handle}
                whatsapp={profile.whatsapp}
              />
            )}
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
