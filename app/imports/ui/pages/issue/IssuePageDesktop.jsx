import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import OriginalPost from '../../components/issue/OriginalPost';
import ReplyBox from '../../components/issue/ReplyBox';
import Replies from '../../components/issue/Replies';

class IssuePageDesktop extends React.Component {
  render() {
    const wrapperStyle = {
      paddingTop: '30px',
      paddingBottom: '30px',
    };

    return (
        <div style={wrapperStyle}>
          <Container>
            <OriginalPost issue={this.props.issue}/>
            <ReplyBox issue={this.props.issue}/>
            <Replies issue={this.props.issue} replies={this.props.replies}/>
          </Container>
        </div>
    );
  }
}

IssuePageDesktop.propTypes = {
  issue: PropTypes.object,
  replies: PropTypes.array.isRequired,
};

export default withRouter(IssuePageDesktop);
