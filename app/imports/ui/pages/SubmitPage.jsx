import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
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
import { Issues, IssuesSchema } from '../../api/IssuesCollection/IssuesCollection';
import WarningModal from '../components/submit/WarningModal';

class SubmitPage extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
    this.state = {
      location: {
        lat: undefined,
        long: undefined,
      },
      haveUserLocation: false,
    };
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
        this.setState({ haveUserLocation: false }));
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Issue failed to submit: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Issue has been submitted' });
      this.formRef.reset();
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
    Issues.insert({ title, description, tags, likes, status, lat, long, createdAt, owner, likedBy, tagColors },
        this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
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
          </Grid.Column>
        </Grid>
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
