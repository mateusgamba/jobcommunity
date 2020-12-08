import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import CreateProfile from "../profile-forms/CreateProfile";
import { UncontrolledPopover, PopoverBody } from "reactstrap";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  const title = process.env.REACT_APP_NAME;

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="pt-3 mb-4">
      {user && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row bg-white">
              <div className="col-sm-12 col-md-2 text-center">
                <img
                  src={user.avatar}
                  alt=""
                  className="img-fluid rounded-circle"
                />
                <p>
                  <small>
                    <button
                      className="btn btn-link btn-sm p-0 btn-link-primary"
                      id="PopoverLegacy"
                      type="button"
                    >
                      Change your photo. <i className="fas fa-info-circle" />
                    </button>
                    <UncontrolledPopover
                      trigger="legacy"
                      placement="top"
                      target="PopoverLegacy"
                    >
                      <PopoverBody>
                        The photo you use on {title} comes from
                        <a
                          href="https://gravatar.com/site/login/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          Gravatar <i className="fas fa-external-link-alt"></i>
                        </a>
                        , a universal avatar service (it stands for "Globally
                        Recognized Avatar," get it?).
                        <br />
                        Your image may also appear on other sites using Gravatar
                        whenever you're logged in with the email {user.email}.
                      </PopoverBody>
                    </UncontrolledPopover>
                  </small>
                </p>
              </div>
              <div className="col-sm-12 col-md-10 align-self-center">
                <h3 className="m-0">{user.name}</h3>

                {profile !== null && (
                  <ul className="list-inline">
                    <li className="list-inline-item mr-3">
                      <Link to={`/profile/${profile.handle}`}>
                        View profile
                      </Link>
                    </li>
                    <li className="list-inline-item mr-3">
                      <Link to="/edit-profile">Edit profile</Link>
                    </li>
                    <li className="list-inline-item mr-3">
                      <Link to="/change-password">Change password</Link>
                    </li>
                    <li className="list-inline-item mr-3">
                      <a href="#!" onClick={() => deleteAccount()}>
                        Delete my account
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {profile !== null ? (
        <Fragment>
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
        </Fragment>
      ) : (
        <CreateProfile />
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
