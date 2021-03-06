import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Issues } from '../../../../api/IssuesCollection/IssuesCollection';

class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.hasLiked = this.hasLiked.bind(this);
    this.likedCallback = this.likedCallback.bind(this);
    this.unlikedCallback = this.unlikedCallback.bind(this);
    this.handleLikeIssue = this.handleLikeIssue.bind(this);
    this.handleUnlikeIssue = this.handleUnlikeIssue.bind(this);
  }

  // Check if the user has already liked this issue
  hasLiked() {
    const userID = Meteor.userId();
    if (_.indexOf(this.props.issue.likedBy, userID) >= 0) {
      return true;
    }
    return false;
  }

  likedCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Failed to Like the Issue: ${error.message}.` });
    } else {
      Bert.alert({ type: 'success', message: 'Liked the Issue' });
    }
  }

  unlikedCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Failed to Unlike the Issue: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Unliked the Issue' });
    }
  }

  handleLikeIssue = () => {
    const userID = Meteor.userId();
    Issues.increaseLikes(this.props.issue._id, userID, undefined, this.likedCallback);
  };

  handleUnlikeIssue = () => {
    const userID = Meteor.userId();
    Issues.decreaseLikes(this.props.issue._id, userID, undefined, this.unlikedCallback);
  };

  render() {
    return (
        <div>
          {
            this.hasLiked() ? <Icon name='heart' link onClick={this.handleUnlikeIssue} size='large'/>
                : <Icon name='heart outline' link onClick={this.handleLikeIssue} size='large'/>
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
