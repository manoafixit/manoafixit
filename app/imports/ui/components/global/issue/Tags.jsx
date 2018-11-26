import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink'];

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

class Tags extends React.Component {
  render() {
    const tagStyle = {
      paddingLeft: '10px',
    };

    return (
        <div style={tagStyle}>
          {this.props.issue.tags ? this.props.issue.tags.map((tag, index) => <Label key={index}
                     color={randomColor()}> {tag} </Label>) : ''}
        </div>
    );
  }
}

Tags.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(Tags);
