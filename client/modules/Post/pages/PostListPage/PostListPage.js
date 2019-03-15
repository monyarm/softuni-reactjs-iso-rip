import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';

// Import Actions
import {
  addPostRequest,
  fetchPosts,
  deletePostRequest
} from "../../PostActions";
import { toggleAddPost } from "../../../App/AppActions";

// Import Selectors
import { getShowAddPost } from "../../../App/AppReducer";
import { getPosts } from "../../PostReducer";
import { isNullOrUndefined } from "util";

class PostListPage extends Component {
  _filteredPosts = this.props.posts;
  get filteredPosts() {
    return this._filteredPosts;
  }
  set filteredPosts(value) {
    this._filteredPosts = value;
  }
  filterPosts() {
    this.filteredPosts = this.props.posts.filter(
      x =>
        x.gameName.includes(this.refs.gameTitle.value) ||
        x.title.includes(this.refs.gameTitle.value) ||
        x.name.includes(this.refs.gameTitle.value)
    );
    if (this.refs.gameTitle.value.trim() == "") {
      this.filteredPosts = this.props.posts;
    }
    this.setState({ state: this.state });
  }
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleDeletePost = post => {
    if (confirm("Do you want to delete this post")) {
      // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleAddPost = (name, title, content, gameName, originalSize, reducedSize) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(
      addPostRequest({
        name,
        title,
        content,
        gameName,
        originalSize,
        reducedSize
      })
    );
  };

  render() {
    return (
      <div>
        <PostCreateWidget
          addPost={this.handleAddPost}
          showAddPost={this.props.showAddPost}
        />

        <div>
          <input
            placeholder="Game Title"
            className="form-control"
            ref="gameTitle"
          />
          <br />
          <button
            className="btn btn-primary"
            onClick={this.filterPosts.bind(this)}
          >
            Filter
          </button>
        </div>
        <PostList
          handleDeletePost={this.handleDeletePost}
          posts={this.filteredPosts}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostListPage.need = [
  () => {
    return fetchPosts();
  }
];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state)
  };
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      gameName: PropTypes.string.isRequired,
      originalSize: PropTypes.number.isRequired,
      reducedSize: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired,
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

PostListPage.contextTypes = {
  router: PropTypes.object
};

export default connect(mapStateToProps)(PostListPage);
