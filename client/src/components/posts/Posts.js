import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h2 className="my-3 title">Community</h2>

      <PostForm />
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
