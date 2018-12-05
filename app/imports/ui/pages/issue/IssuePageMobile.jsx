import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import OriginalPost from '../../components/issue/OriginalPost';
import ReplyBox from '../../components/issue/ReplyBox';
import Replies from '../../components/issue/Replies';

class IssuePageMobile extends React.Component {
  render() {
    const wrapperStyle = {
      paddingTop: '30px',
      paddingBottom: '30px',
      wordWrap: 'break-word',
    };
    const issueWrapperStyle = {
      wordWrap: 'break-word',
    };

    return (
        <div style= {wrapperStyle}>
          <Container>
            <Grid>
              <Grid.Row>
            <div style={issueWrapperStyle}>
              <OriginalPost issue={this.props.issue}/>
            </div>
              </Grid.Row>
              <Grid.Row>
            <ReplyBox issue={this.props.issue}/>
              </Grid.Row>
              <Grid.Row>
            <Replies issue={this.props.issue} replies={this.props.replies}/>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
    );
  }
}

IssuePageMobile.propTypes = {
  issue: PropTypes.object,
  replies: PropTypes.array,
};

export default withRouter(IssuePageMobile);
