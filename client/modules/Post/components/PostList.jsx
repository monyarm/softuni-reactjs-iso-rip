import React from "react";
import PropTypes from "prop-types";
import PostListItem from "./PostListItem/PostListItem";

function PostList(props) {
  return (
    <div className="listView">
      {props.posts.map(post => (
        <PostListItem
          post={post}
          key={post.cuid}
          onDelete={() => props.handleDeletePost(post.cuid)}
        />
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      gameName: PropTypes.string.isRequired,
      originalSize: PropTypes.number.isRequired,
      reducedSize: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired
    })
  ).isRequired,
  handleDeletePost: PropTypes.func.isRequired
};

export default PostList;
