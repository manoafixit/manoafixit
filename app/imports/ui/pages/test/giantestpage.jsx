import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class giantestpage extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    return 'Not yet implemented';
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }


  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Button basic onClick={this.onClick}>Button 1</Button>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
giantestpage.propTypes = {
  location: PropTypes.array.isRequired,
  event: PropTypes.array.isRequired,
  category: PropTypes.array.isRequired,
  form: PropTypes.array.isRequired,
  building: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,

};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Issues');
  return {
    // issues: Issues.find({}).fetch(),
    ready: subscription.ready(),
  };
})(giantestpage);
