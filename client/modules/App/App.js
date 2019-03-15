import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Import Style
import styles from "./App.css";

// Import Components
import Helmet from "react-helmet";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Import Actions
import { toggleAddPost } from "./AppActions";
import { switchLanguage } from "../../modules/Intl/IntlActions";
import { loadUserProps, logout } from "../../modules/User/UserActions";

let DevTools;
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  DevTools = require("./components/DevTools").default;
}
import cookie from "react-cookie";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }
 componentWillMount() {
    const loginResult = cookie.load("mernAuth");
    const token = loginResult ? loginResult.t : null;
    const username = loginResult ? loginResult.u : null;
    if (this.props.user == null && token && username) {
      this.props.dispatch(loadUserProps({ username: username }));
    }
  }
  handleLogout = () => {
    this.props.dispatch(logout());
  };

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  render() {
    return (
      <div>
        {this.state.isMounted &&
          !window.devToolsExtension &&
          process.env.NODE_ENV === "development" && <DevTools />}
        <div>
          <Helmet
            title="ISO Ripper - Game Savings Blog"
            titleTemplate="ISO Ripper - Game Savings Blog"
            meta={[
              { charset: "utf-8" },
              {
                "http-equiv": "X-UA-Compatible",
                content: "IE=edge"
              },
              {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
              }
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            toggleAddPost={this.toggleAddPostSection}
            logout={this.handleLogout}
            user={this.props.user}
          />
          <div className={styles.container}>{this.props.children}</div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  })
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    user: store.user.data
  };
}

export default connect(mapStateToProps)(App);
