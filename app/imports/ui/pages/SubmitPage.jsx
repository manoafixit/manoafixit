import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { Bert } from 'meteor/themeteorchef:bert';
import {
  AutoForm,
  TextField,
  ListField,
  LongTextField,
  SubmitField,
  ErrorsField,
  HiddenField,
} from 'uniforms-semantic/';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Issues, IssuesSchema } from '../../api/IssuesCollection/IssuesCollection';
import WarningModal from '../components/submit/WarningModal';

class SubmitPage extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.trackingError = this.trackingError.bind(this);
    this.generateColors = this.generateColors.bind(this);
    this.formRef = null;
    this.state = {
      location: {
        lat: undefined,
        long: undefined,
      },
      haveUserLocation: false,
      redirect: false,
      issueID: '',
    };
  }

  trackingError(error) {
    let output = '';

    switch (error.code) {
      case error.PERMISSION_DENIED:
        output = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        output = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        output = 'The request to get user location timed out.';
        break;
      default:
        output = 'An unknown error occurred.';
        break;
    }
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: <p>Warning</p>,
      text: `An error occurred: ${output}`,
      type: 'error',
      confirmButtonText: 'Okay',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            location: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
            haveUserLocation: true,
          });
        },
        this.setState({ haveUserLocation: false }),
        this.trackingError,
        {
          maximumAge: 600000,
          timeout: 5000,
          enableHighAccuracy: true,
        });
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Issue failed to submit: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Issue has been submitted' });
      this.formRef.reset();
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 2000);
    }
  }

  generateColors() {
    const colors = ['olive', 'teal', 'purple', 'pink'];
    return _.shuffle(colors);
  }

  /** On submit, insert the data. */
  submit(data) {
    const { title, description, tags, likes, status, lat, long, createdAt } = data;
    const owner = Meteor.user().username;
    const tagColors = this.generateColors();
    const likedBy = [];
    const issueID = Issues.insert({
      title, description, tags, likes, status, lat, long, createdAt, owner, likedBy, tagColors,
    }, this.insertCallback);
    this.setState({ issueID: issueID });

  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const wrapperStyle = {
      paddingTop: '20px',
      paddingBottom: '50px',
    };

    const { from } = { from: { pathname: `/issue/${this.state.issueID}` } };

    if (this.state.redirect) {
      return <Redirect to={from}/>;
    }

    return (
        <div style={wrapperStyle}>
          <Grid container centered>
            <Grid.Column>
              {this.state.haveUserLocation ?
                  <div>
                    <Header as="h2" textAlign="center">Submit Issue</Header>
                    <AutoForm ref={(ref) => {
                      this.formRef = ref;
                    }} schema={IssuesSchema} onSubmit={this.submit}>
                      <Segment>
                        <TextField name='title'/>
                        <LongTextField name='description'/>
                        <ListField name='tags'>
                        </ListField>
                        <SubmitField value='Submit'/>
                        <ErrorsField/>
                        <HiddenField name='likes'/>
                        <HiddenField name='status'/>
                        <HiddenField name='lat' value={this.state.location.lat}/>
                        <HiddenField name='long' value={this.state.location.long}/>
                        <HiddenField name='createdAt' value={new Date()}/>
                        <HiddenField name='owner' value='fakevalue'/>
                        <HiddenField name='tagColors'/>
                      </Segment>
                    </AutoForm>
                  </div>
                  : <WarningModal/>}
              <Segment style={{ marginBottom: '5px' }}>
                <b>Note: Tracking the location of where an issue is submitted is less
                  accurate when submitting from a computer or laptop than submitting
                  from your phone or any device with a GPS.</b>
              </Segment>
              <Grid.Row>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issues: Issues.getCollectionDocuments(),
    ready: sub.ready(),
  };
})(SubmitPage);
