import React from 'react';
import _ from 'lodash';
import { Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        isLoading: false,
        results: [],
        value: '',
      },
    };
  }

  resetSearchBar = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    // eslint-disable-next-line consistent-return
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetSearchBar();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      const plucked = _.map(this.props.issues, 'title');
      this.setState({
        isLoading: false,
        results: _.filter(plucked, isMatch),
      });
    }, 300);
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
        <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
        />
    );
  }
}

SearchBar.propTypes = {
  issues: PropTypes.array.isRequired,
};

export default withRouter(SearchBar);
