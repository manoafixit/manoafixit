import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class Owner extends React.Component {
  render() {

    return (
        <Table.Cell textAlign='center'> {this.props.issue.owner}
        </Table.Cell>
    );
  }
}

Owner.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(Owner);
