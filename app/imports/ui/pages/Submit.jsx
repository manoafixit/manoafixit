import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import SelectField from 'uniforms-semantic/SelectField';
import PropTypes from 'prop-types';
import { Issues, IssuesSchema } from '../../api/IssuesCollection/IssuesCollection';

// const locations = Locations.find({});
class AdminPageAdd extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submitEvent = this.submitEvent.bind(this);
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
  submitLocation(data) {
    const { name, street, city, state, zip_code } = data;
    Issues.insert({ name, street, city, state, zip_code }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Submit Issue</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={IssuesSchema} onSubmit={this.submitLocation}>
              <Segment>
                <TextField name='name'/>
                <TextField name='street'/>
                <TextField name='city'/>
                <SelectField name='state'/>
                <NumField name='zip_code'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}


AdminPageAdd.propTypes = {
  location: PropTypes.string.isRequired,
};
export default AdminPageAdd;
