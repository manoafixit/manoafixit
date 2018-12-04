import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const colors = ['olive', 'teal', 'purple', 'pink'];

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
                     color={randomColor()} size={this.props.size}> {tag} </Label>) : ''}
        </div>
    );
  }
}

Tags.propTypes = {
  issue: PropTypes.object.isRequired,
  size: PropTypes.string,
};

export default withRouter(Tags);
