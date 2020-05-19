import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { Button, Alert } from "reactstrap";
import InputGroup from "../common/InputGroup";
import isEmpty from "../../utils/isEmpty";
import { withRouter } from "react-router-dom";

const PostForm = ({ addPost, error }) => {
  const [text, setText] = useState("");

  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    addPost({ text });
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
        <form className="form" onSubmit={e => onSubmit(e)}>
          <InputGroup
            type="textarea"
            name="text"
            id="text"
            label="Post a new topic"
            onChange={e => onChange(e)}
            style={{ height: "100px" }}
            value={text}
            error={error}
          />

          <Button color="primary" type="submit" size="lg" className="px-5">
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.post.error
});

export default connect(mapStateToProps, { addPost })(withRouter(PostForm));
