import React from 'react';
import DividerOne from '../components/landing/DividerOne';
import SegmentOne from '../components/landing/SegmentOne';
import SegmentTwo from '../components/landing/SegmentTwo';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <SegmentOne/>
          <DividerOne/>
          <SegmentTwo/>
        </div>
    );
  }
}

export default Landing;
