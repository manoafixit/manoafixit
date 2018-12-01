import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class SortBy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 1,
    };
  }

  handleSortChange = (e, { value }) => {
    this.props.onSortOptionChange(value);
    this.setState({ sort: value });
  }

  render() {
    const sortOptions = [
      { key: 1, text: 'Newest', value: 1 },
      { key: 2, text: 'Oldest', value: 2 },
      { key: 3, text: 'Most Liked', value: 3 },
      { key: 4, text: 'Least Liked', value: 4 },
    ];

    return (
        <Dropdown
            placeholder='Sort By'
            options={sortOptions}
            onChange={this.handleSortChange}
        />
    );
  }
}

SortBy.propTypes = {
  onSortOptionChange: PropTypes.func.isRequired,
};

export default withRouter(SortBy);
