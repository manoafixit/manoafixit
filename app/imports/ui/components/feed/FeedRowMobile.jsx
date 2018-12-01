import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TitleTagsMobile from './responsive/TitleTagsMobile';
import DateMobile from './responsive/DateMobile';
import OwnerMobile from './responsive/OwnerMobile';
import LikesMobile from './responsive/LikesMobile';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class FeedRowMobile extends React.Component {
  render() {
    return (
        <Table.Row>
          <TitleTagsMobile issue={this.props.issue}/>
          <OwnerMobile issue={this.props.issue}/>
          <LikesMobile issue={this.props.issue}/>
          <DateMobile issue={this.props.issue}/>
        </Table.Row>
    );
  }
}

FeedRowMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(FeedRowMobile);
