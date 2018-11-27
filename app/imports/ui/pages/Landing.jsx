import React from 'react';
import SegmentOne from '../components/global/landing/SegmentOne';
import SegmentTwo from '../components/global/landing/SegmentTwo';
import SegmentThree from '../components/global/landing/SegmentThree';

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
