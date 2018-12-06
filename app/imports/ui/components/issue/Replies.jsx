import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Reply from './Reply';
import AdminStatusReply from './AdminStatusReply';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class Replies extends React.Component {
  render() {
    return (
        <div>
          {this.props.replies.map((reply, index) => {
            if (reply.admin_status === false) {
              return <Reply key={index} reply={reply}/>;
            }
            return <AdminStatusReply key={index} reply={reply}/>;
          })}
        </div>
    );
  }
}

Replies.propTypes = {
  replies: PropTypes.array,
  issue: PropTypes.object,
};

export default withRouter(Replies);
