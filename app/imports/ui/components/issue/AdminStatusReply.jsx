import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class AdminStatusReply extends React.Component {
  render() {
    const segmentStyle = {
      paddingTop: '15px',
      paddingBottom: '15px',
    };

    return (
        <div style={segmentStyle}>
          <Header attached='top'> Issue Status Changed </Header>
          <Segment attached>
            {this.props.reply.reply}
          </Segment>
        </div>
    );
  }
}

AdminStatusReply.propTypes = {
  reply: PropTypes.object.isRequired,
};

export default withRouter(AdminStatusReply);
