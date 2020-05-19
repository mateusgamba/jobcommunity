import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileSkill = ({ profile: { skills } }) => (
  <Fragment>
    <h2 className="mb-3 title">Skills</h2>
    <div className="card mb-4">
      <div className="card-body text-content">
        {skills.map((skill, index) => (
          <span key={index} className="badge badge-light mr-2 my-1">
            {skill}
          </span>
        ))}
      </div>
    </div>
  </Fragment>
);

ProfileSkill.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileSkill;
