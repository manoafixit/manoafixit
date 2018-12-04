import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class OwnerMobile extends React.Component {
  render() {

    return (
        <Grid.Column>
          {this.props.issue.owner}
        </Grid.Column>
    );
  }
}

OwnerMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(OwnerMobile);
