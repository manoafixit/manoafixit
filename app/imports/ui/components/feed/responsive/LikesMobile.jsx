import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class LikesMobile extends React.Component {
  render() {
    const likesStyle = { paddingTop: '20px' };

    return (
        <Grid.Column style={likesStyle}>
          <Icon name='heart'/> {this.props.issue.likes}
        </Grid.Column>
    );
  }
}

LikesMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(LikesMobile);
