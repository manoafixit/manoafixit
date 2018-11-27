import React from 'react';
import SegmentOne from '../components/landing/SegmentOne';
import SegmentTwo from '../components/landing/SegmentTwo';
import SegmentThree from '../components/landing/SegmentThree';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <SegmentOne/>
          <SegmentTwo/>
          <SegmentThree/>
        </div>
    );
  }
}

export default Landing;
