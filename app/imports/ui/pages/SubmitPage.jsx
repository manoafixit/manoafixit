import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Segment } from 'semantic-ui-react';
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

const options = [];

class SubmitPage extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    // this.onAddItem = this.onAddItem.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { title, description, tags, likes, status, lat, long, createdAt } = data;
    const owner = Meteor.user().username;
    Issues.insert({ title, description, tags, likes, status, lat, long, createdAt, owner }, this.insertCallback);
  }

  // onAddItem(event, tag) {
  //   options.push({ key: tag.toString(), text: `${tag}`, value: `${tag}` });
  // }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
// eslint-disable-next-line no-console
    console.log(options);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Submit Issue</Header>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={IssuesSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name='title'/>
                <LongTextField name='description'/>
                <ListField name='tags'>
                </ListField>
                {/* <Dropdown search selection allowAdditions onAddItem={this.onAddItem} options={options}/> */}
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='likes'/>
                <HiddenField name='status'/>
                <HiddenField name='lat' value={2}/>
                <HiddenField name='long' value={3}/>
                <HiddenField name='createdAt' value={new Date()}/>
                <HiddenField name='owner' value='fakevalue'/>
              </Segment>
            </AutoForm>
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