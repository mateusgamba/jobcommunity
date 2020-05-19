import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { updateLike, deletePost } from "../../actions/post";
import classnames from "classnames";

const PostItem = ({
  updateLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date, liked },
  showActions
}) => (
  <div className="card mb-3 mt-1">
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

            {showActions && (
              <div className="mt-2">
                <button
                  onClick={() => updateLike(_id, liked)}
                  type="button"
                  className={classnames("btn btn-sm mr-2", {
                    "btn-primary": liked
                  })}
                >
                  <i className="fas fa-thumbs-up" />{" "}
                  <span>
                    {likes.length > 0 && <span>({likes.length})</span>}
                  </span>
                </button>
                <Link
                  to={`/posts/${_id}`}
                  className="btn btn-primary btn-sm mr-2"
                >
                  Comments{" "}
                  {comments.length > 0 && (
                    <span className="comment-count">({comments.length})</span>
                  )}
                </Link>

                {!auth.loading && user === auth.user._id && (
                  <button
                    onClick={() => deletePost(_id)}
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { updateLike, deletePost })(PostItem);
