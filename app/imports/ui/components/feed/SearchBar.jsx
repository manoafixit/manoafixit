import React from 'react';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: '',
    };
    this.resetSearchBar = this.resetSearchBar.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  resetSearchBar = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    // eslint-disable-next-line consistent-return
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetSearchBar();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const issues = _.map(this.props.issues, issue => _.omit(issue, ['createdAt', 'likedBy', 'tagColors']));
      this.setState({
        isLoading: false,
        results: _.filter(issues, issue => re.test(issue.title)),
      });
    }, 300);
  }

  componentWillUnmount() {
    this.resetSearchBar();
  }

  render() {
    const { isLoading, value, results } = this.state;

    const resultRenderer = ({ title, _id }) => <Link to={`/issue/${_id}`}> {title} </Link>;
    return (
        <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
        />
    );
  }
}

SearchBar.propTypes = {
  issues: PropTypes.array.isRequired,
};

export default withRouter(SearchBar);
