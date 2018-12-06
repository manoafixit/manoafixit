import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import DateMobile from './responsive/DateMobile';
import OwnerMobile from './responsive/OwnerMobile';
import Status from '../../components/global/issue/Status';
import Tags from '../global/issue/Tags';
import TitleMobile from './responsive/TitleMobile';
import Likes from '../global/issue/Likes';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class FeedRowMobile extends React.Component {
  render() {
    const issueInfoStyle = { paddingLeft: '10px' };

    const likesStyle = { paddingTop: '20px' };

    return (
        <Segment attached>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column width={3}>
                <Grid.Row>
                  <Status issue={this.props.issue}/>
                </Grid.Row>
                <Grid.Row stretched>
                  <Grid.Column style={likesStyle}>
                    <Likes issue={this.props.issue}/>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>

              <Grid.Column>
                <div style={issueInfoStyle}>
                  <TitleMobile issue={this.props.issue}/>
                  <DateMobile issue={this.props.issue}/>
                  <OwnerMobile issue={this.props.issue}/>
                  <Tags issue={this.props.issue} size={'mini'}/>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    );
  }
}

FeedRowMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(FeedRowMobile);
