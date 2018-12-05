import React from 'react';
import DividerOne from '../components/landing/DividerOne';
import DividerTwo from '../components/landing/DividerTwo';
import SegmentOne from '../components/landing/SegmentOne';
import SegmentTwo from '../components/landing/SegmentTwo';
import SegmentThree from '../components/landing/SegmentThree';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <SegmentOne/>
          <DividerOne/>
          <SegmentTwo/>
          <DividerTwo/>
          <SegmentThree/>
        </div>
    );
  }
}

export default Landing;
