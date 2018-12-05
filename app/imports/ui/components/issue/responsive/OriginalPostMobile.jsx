import React from 'react';
import { Segment, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Tags from '../../global/issue/Tags';


/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class OriginalPostMobile extends React.Component {
  render() {
    return (
        <div>
          <Segment attached>
            {this.props.issue.description ? this.props.issue.description : <i>This issue has no description</i>}
          </Segment>
          <Message attached='bottom'>
            {<Tags issue={this.props.issue} size={'mini'}/>}
          </Message>
        </div>
    );
  }
}

OriginalPostMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(OriginalPostMobile);
