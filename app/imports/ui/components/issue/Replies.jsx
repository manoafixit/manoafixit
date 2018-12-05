import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/erasaur:meteor-lodash';
import Reply from './Reply';
import AdminStatusReply from './AdminStatusReply';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class Replies extends React.Component {
  render() {
    const normal_replies = _.filter(this.props.replies, (reply) => reply.admin_status === false);
    const admin_replies = _.filter(this.props.replies, (reply) => reply.admin_status === true);
    return (
        <div>
          {normal_replies.map((reply, index) => <Reply key={index} reply={reply}/>)}
          {admin_replies.map((reply, index) => <AdminStatusReply key={index} reply={reply}/>)}
        </div>
    );
  }
}

Replies.propTypes = {
  replies: PropTypes.array,
  issue: PropTypes.object,
};

export default withRouter(Replies);
