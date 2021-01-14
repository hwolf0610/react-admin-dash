import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DefaultFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <a href="https://dashchallengesapi.com/" target="_blank" rel="noopener noreferrer">Dash</a>
          <span className="ml-1">&copy; 2020 Smart Work.</span>
        </div>
        <div className="ml-auto">
          <span className="mr-1">Powered by</span>
          <a href="https://dashchallengesapi.com/" target="_blank" rel="noopener noreferrer">Smart Work Team</a>
        </div>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = {
  children: PropTypes.node,
};

DefaultFooter.defaultProps = {};

export default DefaultFooter;
