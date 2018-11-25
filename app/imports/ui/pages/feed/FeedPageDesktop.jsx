import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Menu, Table, Dropdown, Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';
import IssueDesktop from '../../components/feed/responsive/IssueDesktop';
import SubmitButton from '../../components/feed/SubmitButton';

const fakeData = [];
const sortOptions = [
  { key: 1, text: 'Newest', value: 1 },
  { key: 2, text: 'Oldest', value: 2 },
  { key: 3, text: 'Most Liked', value: 3 },
  { key: 4, text: 'Least Liked', value: 4 },
];

class FeedPageDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        isLoading: false,
      },
      sort: 1,
    };
  }

  // ---Search Bar Start--- //

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

// eslint-disable-next-line consistent-return
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(fakeData, isMatch),
      });
    }, 300);
  }

  // ---Search Bar End--- //

  handleSortChange = (e, { value }) => this.setState({ sort: value });

  switch() {
    let result = [];
    switch (this.state.sort) {
      case 1:
        result = this.props.issuesNewest.map((issue, index) => <IssueDesktop key={index} issue={issue}/>);
        break;
      case 2:
        result = this.props.issuesOldest.map((issue, index) => <IssueDesktop key={index} issue={issue}/>);
        break;
      case 3:
        result = this.props.issuesMostLiked.map((issue, index) => <IssueDesktop key={index} issue={issue}/>);
        break;
      case 4:
        result = this.props.issuesLeastLiked.map((issue, index) => <IssueDesktop key={index} issue={issue}/>);
        break;
      default:
        throw new Meteor.Error('Error in switch() somehow');
    }
    return result;
  }

  render() {
    const { isLoading } = this.state;
    const wrapperStyle = {
      paddingTop: '20px',
    };

    const menuHeaderStyle = {
      boxShadow: 'none',
      border: 'none',
    };

    return (
        <div className='wrapper' style={wrapperStyle}>
          <Container>
            <Menu borderless style={menuHeaderStyle}>
              <Menu.Item position='right'>
                <SubmitButton/>
              </Menu.Item>
            </Menu>

            <Menu borderless style={menuHeaderStyle}>
              <Menu.Item>
                <Search
                    loading={isLoading}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                />
              </Menu.Item>
              <Menu.Item position='right'>
                <Dropdown
                    placeholder='Sort By'
                    options={sortOptions}
                    onChange={this.handleSortChange}
                />
              </Menu.Item>
            </Menu>

            <Table
                striped
                stackable
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Issue</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Poster</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.switch()}
              </Table.Body>
            </Table>
          </Container>
        </div>
    );
  }
}

FeedPageDesktop.propTypes = {
  issuesNewest: PropTypes.array.isRequired,
  issuesOldest: PropTypes.array.isRequired,
  issuesMostLiked: PropTypes.array.isRequired,
  issuesLeastLiked: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issuesNewest: Issues.getCollectionDocuments({}, { sort: { createdAt: -1 } }),
    issuesOldest: Issues.getCollectionDocuments({}, { sort: { createdAt: 1 } }),
    issuesMostLiked: Issues.getCollectionDocuments({}, { sort: { likes: -1 } }),
    issuesLeastLiked: Issues.getCollectionDocuments({}, { sort: { likes: 1 } }),
    ready: sub.ready(),
  };
})(FeedPageDesktop);
