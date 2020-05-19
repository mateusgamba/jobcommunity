import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import { Button, Alert } from "reactstrap";
import InputGroup from "../common/InputGroup";
import isEmpty from "../../utils/isEmpty";
import { withRouter } from "react-router-dom";

const CommentForm = ({ postId, addComment, error }) => {
  const [text, setText] = useState("");

  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    addComment(postId, { text });
  };

  useEffect(() => {
    if (isEmpty(error)) {
      setText("");
    }
  }, [error]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        {!isEmpty(error) && <Alert color="danger">{error.message}</Alert>}
        <form onSubmit={e => onSubmit(e)}>
          <InputGroup
            type="textarea"
            name="text"
            id="text"
            label="Leave a comment"
            onChange={e => onChange(e)}
            style={{ height: "100px" }}
            placeholder="Comment the post"
            value={text}
            error={error}
          />

          <Button color="primary" type="submit">
            Comment
          </Button>
        </form>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.post.error
});

export default connect(mapStateToProps, { addComment })(
  withRouter(CommentForm)
);
