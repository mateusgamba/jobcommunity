import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";
import { Link } from "react-router-dom";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="MMM YYYY">{moment.utc(exp.from)}</Moment> -{" "}
        {exp.to === null ? (
          " Present"
        ) : (
          <Moment format="MMM YYYY">{moment.utc(exp.to)}</Moment>
        )}
      </td>
      <td className="text-right">
        <button
          onClick={() => deleteExperience(exp._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="card mb-4">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="m-0">Experiences</h5>

          {experience.length > 0 && (
            <Link className="btn btn-primary btn-sm" to="/add-experience">
              Add a new experience
            </Link>
          )}
        </div>
      </div>

      <div className="card-body">
        {experience.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-border-top-none m-0">
              <thead>
                <tr>
                  <th width="30%">Company</th>
                  <th width="35%">Title</th>
                  <th width="25%">Years</th>
                  <th width="10%" />
                </tr>
              </thead>
              <tbody>{experiences}</tbody>
            </table>
          </div>
        ) : (
          <p className="text-center m-0">
            <Link to="/add-experience" className="btn btn-primary">
              Add a new experience
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
