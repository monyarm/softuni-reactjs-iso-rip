import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import reactCookie from "react-cookie";
import styles from "./PostCreateWidget.css";
import { connect } from "react-redux";

export class PostCreateWidget extends Component {
  componentDidMount() {}

  addPost = () => {
    const nameRef = reactCookie.load("mernAuth").u;
    const titleRef = this.refs.title;
    const gameRef = this.refs.gameName;
    const contentRef = this.refs.content;
    const originalSizeRef = this.refs.originalSize;
    const reducedSizeRef = this.refs.optimizedSize;
    if (
      nameRef &&
      titleRef.value &&
      contentRef.value &&
      gameRef.value &&
      originalSizeRef.value &&
      reducedSizeRef.value
    ) {
      this.props.addPost(
        nameRef,
        titleRef.value,
        contentRef.value,
        gameRef.value,
        originalSizeRef.value,
        reducedSizeRef.value
      );
      titleRef.value = contentRef.value = "";
    }
  };

  render() {
    const cls = `${styles.form} ${this.props.showAddPost ? styles.appear : ""}`;
    return (
      <div className={cls}>
        <div className={styles["form-content"]}>
          <h2 className={styles["form-title"]}>
            <FormattedMessage id="createNewPost" />
          </h2>
          <input
            placeholder={this.props.intl.messages.postTitle}
            className={styles["form-field"]}
            ref="title"
          />
          <input
            placeholder="Game Name"
            className={styles["form-field"]}
            ref="gameName"
            onChange={this.componentDidMount()}
          />
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Original Size (MB)"
              className={styles["form-field"]}
              ref="originalSize"
            />
            <input
              type="text"
              placeholder="Optimized Size (MB)"
              className={styles["form-field"]}
              ref="optimizedSize"
            />
          </div>
          <textarea
            placeholder={this.props.intl.messages.postContent}
            className={styles["form-field"]}
            ref="content"
          />
          <a
            className={styles["post-submit-button"]}
            href="#"
            onClick={this.addPost}
          >
            <FormattedMessage id="submit" />
          </a>
        </div>
        <p>{JSON.stringify(this.props.games)}</p>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
  intl: intlShape.isRequired
};

function mapStateToProps(state) {
  return {};
}
export default injectIntl(
  connect(
    mapStateToProps,
    null,
    null,
    { withRef: true }
  )(PostCreateWidget)
);
