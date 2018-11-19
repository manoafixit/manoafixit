import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class Tags extends React.Component {
  render() {
    const tagStyle = {
      paddingLeft: '10px',
    };

    return (
        <div style={tagStyle}>
          {this.props.issue.tags.map((tag, index) => <Label key={index} basic> {tag} </Label>)}
        </div>
    );
  }
}

Tags.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(Tags);
