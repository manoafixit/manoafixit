import React from 'react';
import { Grid, Segment, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import TitleTagsMobile from './responsive/TitleTagsMobile';
import DateMobile from './responsive/DateMobile';
import OwnerMobile from './responsive/OwnerMobile';
import LikesMobile from './responsive/LikesMobile';
import Status from '../../components/global/issue/Status';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class FeedRowMobile extends React.Component {
  render() {
    return (
        <Segment attached>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column width={3}>
                <Grid.Row>
                  <Status issue={this.props.issue}/>
                </Grid.Row>
                <Grid.Row stretched>
                  <LikesMobile issue={this.props.issue}/>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column>
                <Link to={`/issue/${this.props.issue._id}`}> {this.props.issue.title} </Link>
                <OwnerMobile issue={this.props.issue}/>
                <DateMobile issue={this.props.issue}/>
                <TitleTagsMobile issue={this.props.issue}/>
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
