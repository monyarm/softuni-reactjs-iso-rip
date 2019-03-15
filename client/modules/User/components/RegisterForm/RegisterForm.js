import React, {Component } from "react";
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

// Import Style
import styles from "./RegisterForm.css";

export class RegisterForm extends Component {
  onRegister = e => {
    e.preventDefault();
    const usernameRef = this.refs.username;
    const passwordRef = this.refs.password;
    if (usernameRef.value && passwordRef.value) {
      this.props.register(usernameRef.value, passwordRef.value);
      passwordRef.value = "";
    }
  };

  render() {
    return (
      <form className={styles["form-content"]} onSubmit={this.onRegister}>
        <h2 className={styles["form-title"]}>
          <FormattedMessage id="registerTitle" />
        </h2>
        <input
          placeholder={this.props.intl.messages.username}
          className="form-control"
          ref="username"
        />
        <br />
        <input
          placeholder={this.props.intl.messages.password}
          className="form-control"
          ref="password"
          type="password"
        />
        <br />
        <button className="btn btn-primary" onClick={this.onRegister}>
          <FormattedMessage id="submit" />
        </button>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(RegisterForm);
