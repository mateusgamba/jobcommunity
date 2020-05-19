import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <div className="card mb-4">
    <div className="card-body">
      <div className="row">
        <div className="col-3 col-md-1">
          <img className="img-fluid rounded-circle" src={avatar} alt="" />
        </div>
        <div className="col-9 col-md-11">
          <h4 className="m-0">{name}</h4>
          <div style={{ paddingLeft: "2px" }}>
            <p className="m-0">
              <small className="text-muted">
                Posted on{" "}
                <Moment format="D MMMM YYYY [at] HH:mm">{date}</Moment>
              </small>
            </p>
            {text.split("\n").map(function(item, key) {
              return (
                <p className="m-0" key={key}>
                  {item}
                  <br />
                </p>
              );
            })}

            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deleteComment(postId, _id)}
                type="button"
                className="btn btn-danger btn-sm mt-2"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
