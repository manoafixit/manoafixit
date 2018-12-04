import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { STATUS } from '../../../api/IssuesCollection/IssueStatuses';

class FilterBy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
    };
  }

  handleFilterChange = (e, { value }) => {
    this.props.onFilterOptionChange(value);
    this.setState({ filter: value });
  }

  render() {
    const filterOptions = [
      { key: 0, text: 'All Issues', value: 0 },
      { key: 1, text: `${STATUS.OPEN} Issues`, value: 1 },
      { key: 2, text: `${STATUS.ACKNOWLEDGED} Issues`, value: 2 },
      { key: 3, text: `${STATUS.ONGOING} Issues`, value: 3 },
      { key: 4, text: `${STATUS.RESOLVED} Issues`, value: 4 },
      { key: 5, text: `${STATUS.DUPLICATE} Issues`, value: 5 },
    ];

    return (
        <Dropdown
            placeholder='Filter Issues'
            options={filterOptions}
            onChange={this.handleFilterChange}
        />
    );
  }
}

FilterBy.propTypes = {
  onFilterOptionChange: PropTypes.func.isRequired,
};

export default withRouter(FilterBy);
