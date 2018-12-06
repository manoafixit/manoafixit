import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Tags extends React.Component {
  render() {
    const tagStyle = {
      paddingLeft: '10px',
    };

    return (
        <div style={tagStyle}>
          {this.props.issue.tags ? this.props.issue.tags.map((tag, index) => <Label key={index}
                     color={this.props.issue.tagColors[index]} size={this.props.size}> {tag} </Label>) : ''}
        </div>
    );
  }
}

Tags.propTypes = {
  issue: PropTypes.object.isRequired,
  size: PropTypes.string,
};

export default withRouter(Tags);
