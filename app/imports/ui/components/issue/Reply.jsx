import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class Reply extends React.Component {
  render() {
    const date = format(this.props.reply.createdAt, 'MMMM D, YYYY, h:mm aa');

    const segmentStyle = {
      paddingTop: '15px',
      paddingBottom: '15px',
    };

    return (
        <div style={segmentStyle}>
          <Header attached='top'> {this.props.reply.owner} commented on {date} </Header>
          <Segment attached>
            {this.props.reply.reply}
          </Segment>
        </div>
    );
  }
}

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
};

export default withRouter(Reply);
