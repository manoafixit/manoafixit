import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import {
  AutoForm,
  TextField,
  LongTextField,
  NumField,
  SubmitField,
  ErrorsField,
  HiddenField,
} from 'uniforms-semantic/';
import { Issues, IssuesSchema } from '../../api/IssuesCollection/IssuesCollection';

// const locations = Locations.find({});
class SubmitPage extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
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
    const { name, street, city, state, zip_code } = data;
    Issues.insert({ name, street, city, state, zip_code }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
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
                <TextField name='tags'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='likes'/>
                <HiddenField name='status'/>
                <HiddenField name='lat'/>
                <HiddenField name='long'/>
                <HiddenField name='createdAt' value={new Date()}/>
                <HiddenField name='owner' value='john@foo.com'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default SubmitPage;
