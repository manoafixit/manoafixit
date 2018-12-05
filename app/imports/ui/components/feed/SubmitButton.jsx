import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { buttonLanding } from '../global/Styles';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export default class SubmitButton extends React.Component {
  render() {
    return (
            <Link to={'/submit'}>
              <Button color='blue' content='New Issue' size='large' style={buttonLanding}/>
            </Link>
    );
  }
}
