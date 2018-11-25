import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TitleTags from '../issue/TitleTags';
import Date from '../issue/Date';
import Owner from '../issue/Owner';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class IssueDesktop extends React.Component {
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

IssueDesktop.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(IssueDesktop);
