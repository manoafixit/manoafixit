import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Menu, Table, Dropdown, Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';
import IssueDesktop from '../../components/feed/responsive/IssueDesktop';
import SubmitButton from '../../components/feed/SubmitButton';

const fakeData = ['test', 'a'];

class FeedPageDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 1,
      search: {
        isLoading: false,
      },
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
                />
              </Menu.Item>
            </Menu>

            <Table striped>
              <Table.Body>
                {this.props.issuesNewest.map((issue, index) => <IssueDesktop key={index} issue={issue}/>)}
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
