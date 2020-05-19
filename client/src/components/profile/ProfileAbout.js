import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile: { bio } }) => (
  <Fragment>
    <h2 className="mb-3 title">About</h2>
    <div className="card mb-4">
      <div className="card-body text-content">
        {bio &&
          bio.split("\n").map(function(item, key) {
            return <p key={key}>{item}</p>;
          })}
      </div>
    </div>
  </Fragment>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
