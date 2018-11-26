import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TitleTags from './cell/TitleTags';
import Date from './cell/Date';
import Owner from './cell/Owner';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class FeedRow extends React.Component {
  render() {
    return (
        <Table.Row>
          <TitleTags issue={this.props.issue}/>
          <Date issue={this.props.issue}/>
          <Owner issue={this.props.issue}/>
        </Table.Row>
    );
  }
}

FeedRow.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(FeedRow);
