import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Tags from '../../global/issue/Tags';
import Status from '../../global/issue/Status';

class TitleTags extends React.Component {
  render() {

    const divStyle = {
      paddingLeft: '60px',
    };

    return (
        <Table.Cell>
          <Status issue={this.props.issue}/>
          <Link to={`/issue/${this.props.issue._id}`}> {this.props.issue.title} </Link>
          <div style={divStyle}>
              <Tags issue={this.props.issue} size={'mini'}/>
          </div>
        </Table.Cell>
    );
  }
}

TitleTags.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(TitleTags);
