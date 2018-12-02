import React from 'react';
import { Grid, Table, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class LikesMobile extends React.Component {
  render() {
    return (
        <Grid.Column>
          <Icon name='heart'/> {this.props.issue.likes}
        </Grid.Column>
    );
  }
}

LikesMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(LikesMobile);
