import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";
import { Link } from "react-router-dom";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="MMM YYYY">{moment.utc(edu.from)}</Moment> -{" "}
        {edu.to === null ? (
          " Present"
        ) : (
          <Moment format="MMM YYYY">{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td className="text-right">
        <button
          onClick={() => deleteEducation(edu._id)}
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
          <h5 className="m-0">Education</h5>

          {educations.length > 0 && (
            <Link className="btn btn-primary btn-sm" to="/add-education">
              Add a new education
            </Link>
          )}
        </div>
      </div>

      <div className="card-body">
        {educations.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-border-top-none table-vertical-align-middle m-0">
              <thead>
                <tr>
                  <th width="30%">School</th>
                  <th width="35%">Degree</th>
                  <th width="25%">Years</th>
                  <th width="10%" />
                </tr>
              </thead>
              <tbody>{educations}</tbody>
            </table>
          </div>
        ) : (
          <p className="text-center m-0">
            <Link to="/add-education" className="btn btn-primary">
              Add a new education
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
