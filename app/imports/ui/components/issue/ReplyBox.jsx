import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import {
  AutoForm,
  LongTextField,
  SubmitField,
  ErrorsField,
  HiddenField,
} from 'uniforms-semantic/';
import { IssueReplies, IssueRepliesSchema } from '../../../api/IssueRepliesCollection/IssueRepliesCollection';

class ReplyBox extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
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

  /** On submit, insert the data. */
  submit(data) {
    const { title, description, tags, likes, status, lat, long, createdAt } = data;
    const owner = Meteor.user().username;
    IssueReplies.insert({ title, description, tags, likes, status, lat, long, createdAt, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const replyBoxStyle = {
      paddingTop: '20px',
    };

    return (
        <Grid centered style={replyBoxStyle}>
          <Grid.Column>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={IssueRepliesSchema} onSubmit={this.submit}>
              <Segment>
                <LongTextField name='reply'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='issue_id' value={this.props.issue._id}/>
                <HiddenField name='createdAt' value={new Date()}/>
                <HiddenField name='owner' value='fakevalue'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

ReplyBox.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssueRepliesCollection');
  return {
    ready: sub.ready(),
  };
})(ReplyBox);
