import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
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
          <Header attached='top'> <Icon name='warning circle'/> Issue Status Changed </Header>
          <Segment attached>
            <i> {this.props.reply.reply} </i>
          </Segment>
        </div>
    );
  }
}

AdminStatusReply.propTypes = {
  reply: PropTypes.object.isRequired,
};

export default withRouter(AdminStatusReply);
