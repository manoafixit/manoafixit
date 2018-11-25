import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import OriginalPost from '../../components/issue/OriginalPost';

class IssuePageDesktop extends React.Component {
  render() {
    const wrapperStyle = {
      paddingTop: '30px',
      paddingBottom: '30px',
    };

    return (
        <div style={wrapperStyle}>
          <Container>
            <OriginalPost issue={this.props.issue}/>
          </Container>
        </div>
    );
  }
}

IssuePageDesktop.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(IssuePageDesktop);
