import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Grid, Header, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import ReplyBox from '../../components/issue/ReplyBox';
import Replies from '../../components/issue/Replies';
import OriginalPostMobile from '../../components/issue/responsive/OriginalPostMobile';
import Status from '../../components/global/issue/Status';
import Likes from '../../components/global/issue/Likes';

class IssuePageMobile extends React.Component {
  render() {
    const wrapperStyle = {
      paddingTop: '30px',
      paddingBottom: '30px',
      // wordWrap: 'break-word',
    };
    const issueWrapperStyle = {
      wordWrap: 'break-word',
    };

    const menuStyle = {
      border: 'none',
      boxShadow: 'none',
    };
    const date = format(this.props.issue.createdAt, 'MMMM D, YYYY, h:mm aa');

    { /* <div style={wrapperStyle}> */
    }
    { /* <Container> */
    }
    { /* <Grid> */
    }
    { /* <Grid.Row> */
    }
    { /* <div style={issueWrapperStyle}> */
    }
    { /* <OriginalPostMobile issue={this.props.issue}/> */
    }
    { /* </div> */
    }
    { /* </Grid.Row> */
    }

    { /* <Grid.Row> */
    }
    { /* <ReplyBox issue={this.props.issue}/> */
    }
    { /* </Grid.Row> */
    }

    { /* <Grid.Row> */
    }
    { /* <Replies issue={this.props.issue} replies={this.props.replies}/> */
    }
    { /* </Grid.Row> */
    }
    { /* </Grid> */
    }
    { /* </Container> */
    }
    { /* </div> */
    }
    return (
        <div style={wrapperStyle}>
              <Grid.Row>
                <Menu borderless style={menuStyle}>
                  <Menu.Item>
                    <Status issue={this.props.issue}/>
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Likes issue={this.props.issue}/>
                  </Menu.Item>
                </Menu>
              </Grid.Row>
              <Grid.Row>
                <Header style={issueWrapperStyle}>
                  {this.props.issue.title}
                  <Header.Subheader>
                    {this.props.issue.owner} opened this issue on {date}
                  </Header.Subheader>
                </Header>
              </Grid.Row>
        </div>
    );
  }
}

IssuePageMobile.propTypes = {
  issue: PropTypes.object,
  replies: PropTypes.array,
};

export default withRouter(IssuePageMobile);
