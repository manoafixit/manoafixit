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
      Bert.alert({ type: 'danger', message: `Reply failed to submit: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Successfully replied' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { reply, createdAt } = data;
    const owner = Meteor.user().username;
    const issue_id = this.props.issue._id;
    IssueReplies.insert({ issue_id, reply, createdAt, owner }, this.insertCallback);
  }

  render() {
    const replyBoxStyle = {
      paddingTop: '5px',
      paddingBottom: '15px',
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
                <HiddenField name='issue_id' value='fakevalue'/>
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
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssueRepliesCollection');
  return {
    ready: sub.ready(),
  };
})(ReplyBox);
