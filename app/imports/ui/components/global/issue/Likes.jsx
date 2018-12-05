import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Likes extends React.Component {
  // Check if the user has already liked this issue
  hasLiked() {
    const userID = Meteor.userId();
    if (this.props.issue.likedBy !== undefined) {
      return this.props.issue.likedBy[userID];
    }
    return false;
  }

  handleLikeIssue = () => {

  };

  handleUnlikeIssue = () => {

  };

  render() {
    return (
        <div>
          {
            this.hasLiked() ? <Icon name='heart' link onClick={this.handleUnlikeIssue}/>
                : <Icon name='heart outline' link onClick={this.handleLikeIssue}/>
          }
          {this.props.issue.likes}
        </div>
    );
  }
}

Likes.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(Likes);
