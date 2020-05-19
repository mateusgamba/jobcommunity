import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import isEmpty from "../../utils/isEmpty";

const ProfileItem = ({
  profile: {
    user: { name, avatar },
    bio,
    status,
    company,
    location,
    skills,
    handle
  }
}) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row no-gutters">
          <div className="col-3 col-sm-2">
            <img src={avatar} alt="" className="img-fluid rounded-circle" />
          </div>
          <div className="col-9 col-sm-10 pl-4">
            <h3 className="m-0">
              <Link to={`/profile/${handle}`}>{name}</Link>
            </h3>
            <div className="left-1">
              <p className="m-0">
                <small className="text-muted">
                  {status}
                  {!isEmpty(company) && <span> at {company}</span>}
                </small>
              </p>
              <p className="m-0">
                <small className="text-muted">
                  {!isEmpty(location) && <span>{location}</span>}
                </small>
              </p>
              <p className="m-0">
                {skills.slice(0, 4).map((skill, index) => (
                  <span key={index} className="badge badge-light mr-2 my-1">
                    {skill}
                  </span>
                ))}
              </p>
              <p className="mt-1 mb-0 preview-text">{bio}</p>
              <p className="mt-2 mb-0">
                <Link
                  to={`/profile/${handle}`}
                  className="btn btn-primary btn-sm"
                >
                  View Profile
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
