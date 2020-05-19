import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
  index
}) => (
  <Fragment>
    {index > 0 && <hr />}
    <h4 className="m-0">{school}</h4>
    <h5 className="m-0">
      {degree}, {fieldofstudy}
    </h5>
    <p className="m-0">
      <small className="text-muted">
        <Moment format="MMM YYYY">{moment.utc(from)}</Moment> -{" "}
        {!to ? " Present" : <Moment format="MMM YYYY">{moment.utc(to)}</Moment>}
      </small>
    </p>

    {description &&
      description.split("\n").map(function(item, key) {
        return (
          <p className="m-0" key={key}>
            {item}
            <br />
          </p>
        );
      })}
  </Fragment>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
