import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
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
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Issues, IssuesSchema } from '../../../api/IssuesCollection/IssuesCollection';

/** Renders the Page for editing a single document. */
class EditIssuePage extends React.Component {
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Failed to edit issue: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Successfully edited issue' });
      this.formRef.reset();
    }
  }

  issueID = () => this.props.id;

  /** On successful submit, insert the data. */
  submit(data) {
    const { title, description, tags } = data;
    console.log(this.issueID);
    Issues.update({ _id: this.issueID }, { title, description, tags }, undefined, this.insertCallback);
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Issue Data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    // Dummy variable
    const fakeValue = 0;
    return (
        <Grid container centered>
          <Grid.Column>
            <div>
              <Header as="h2" textAlign="center">Edit Issue</Header>
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
                  <HiddenField name='lat' value={fakeValue}/>
                  <HiddenField name='long' value={fakeValue}/>
                  <HiddenField name='createdAt' value='DO NOT CHANGE'/>
                  <HiddenField name='owner' value='DO NOT CHANGE'/>
                </Segment>
              </AutoForm>
            </div>
          </Grid.Column>
        </Grid>
    );
  }
}

EditIssuePage.propTypes = {
  issue: PropTypes.object,
  id: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const subscription = Meteor.subscribe('IssuesCollection');
  const docID = match.params._id;
  return {
    id: docID,
    issue: Issues.findOne({ _id: docID }),
    ready: subscription.ready(),
  };
})(EditIssuePage);
