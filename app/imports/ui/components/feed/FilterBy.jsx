import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

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
      { key: 1, text: 'Open Issues', value: 1 },
      { key: 2, text: 'Acknowledged Issues', value: 2 },
      { key: 3, text: 'Ongoing Issues', value: 3 },
      { key: 4, text: 'Resolved Issues', value: 4 },
      { key: 5, text: 'Removed Issues', value: 5 },
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
