import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class TitleMobile extends React.Component {
  render() {

    const divStyle = { paddingTop: '0px' };
    const issueTitleStyle = {
      wordWrap: 'break-word',
      fontWeight: '900',
    };

    return (
        <Grid.Column>
          <div style={divStyle}>
            <Link to={`/issue/${this.props.issue._id}`}>
              <div style={issueTitleStyle}>
                {this.props.issue.title}
              </div>
            </Link>
          </div>
        </Grid.Column>
    );
  }
}

TitleMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(TitleMobile);
