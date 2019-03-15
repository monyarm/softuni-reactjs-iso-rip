import React, { Component } from "react";

import { connect } from "react-redux";
import filesize from "filesize";
import reactCookie from "react-cookie";

// Import Components
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import PostList from "../../../Post/components/PostList";

// Import Actions
import { updateUserInfoRequest } from "../../UserActions";
import { fetchPosts, deletePostRequest } from "../../../Post/PostActions";
// Import Selectors
import { getUser } from "../../UserReducer";
import { getPosts } from "../../../Post/PostReducer";

class ProfilePage extends Component {
  handleUpdate = password => {
    this.props.dispatch(updateUserInfoRequest({ password }));
  };

  componentDidMount() {
    this.props.dispatch(fetchPosts());
    this.filterPosts();
  }
  _filteredPosts = this.props.posts;
  get filteredPosts() {
    return this._filteredPosts;
  }
  set filteredPosts(value) {
    this._filteredPosts = value;
  }
  filterPosts() {
    this.filteredPosts = this.props.posts.filter(
      x => x.name == this.props.user.username
    );
  }
  sum(array, key) {
    return array.reduce((a, b) => a + (b[key] || 0), 0);
  }
  sumDifference = function() {
    var originalSize = this.sum(this.filteredPosts, "originalSize");
    var reducedSize = this.sum(this.filteredPosts, "reducedSize");
    return filesize(originalSize - reducedSize);
  };
  handleDeletePost = post => {
    if (confirm("Do you want to delete this post")) {
      // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };
  render() {
    return (
      <div>
        <ProfileForm updateInfo={this.handleUpdate} user={this.props.user} />
        <p>Total Savings: {this.sumDifference()}</p>
        <br />
        <br />
        <PostList
          handleDeletePost={this.handleDeletePost}
          posts={this.filteredPosts}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: getUser(state),
    posts: getPosts(state)
  };
}

export default connect(mapStateToProps)(ProfilePage);
