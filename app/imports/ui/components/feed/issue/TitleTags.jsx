import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Tags from '../Tags';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class TitleTags extends React.Component {
  render() {

    return (
        <Table.Cell> {this.props.issue.title} <Tags issue={this.props.issue}/>
        </Table.Cell>
    );
  }
}

TitleTags.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(TitleTags);
