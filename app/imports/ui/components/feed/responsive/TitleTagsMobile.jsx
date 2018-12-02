import React from 'react';
import { Grid, Table, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Tags from '../../global/issue/Tags';
import Status from '../../global/issue/Status';

class TitleTagsMobile extends React.Component {
  render() {

    const divStyle = { paddingTop: '0px' };

    return (
        <Grid.Column>
          <div style={divStyle}>
              <Tags issue={this.props.issue} size={'mini'}/>
          </div>
        </Grid.Column>
    );
  }
}

TitleTagsMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(TitleTagsMobile);
