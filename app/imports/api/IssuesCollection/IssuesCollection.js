import SimpleSchema from 'simpl-schema';
// import * as date from 'date-fns';
import { Tracker } from 'meteor/tracker';
import { BaseCollection } from '../../BaseCollection/BaseCollection';

class IssuesCollection extends BaseCollection {
  constructor() {
    super('Issues', new SimpleSchema({
      title: {
        type: String,
        label: 'Issue Title',
        min: 5, // Minimum 5 characters to prevent spam
        max: 100,
      },
      tags: {
        type: [String],
        label: 'Issue Tags',
        optional: true,
        minCount: 1,
        maxCount: 10, // Maximum of 10 tags
      },
      likes: {
        type: Number,
        label: 'Issue Likes',
      },
      status: {
        type: String,
        label: 'Issue Status',
        allowedValues: ['Open', 'Acknowledged', 'Ongoing', 'Resolved', 'Declined'],
        defaultValue: 'Open',
      },
      lat: {
        type: Number,
        label: 'Issue Latitude',
      },
      long: {
        type: Number,
        label: 'Issue Longitude',
      },
      createdAt: {
        type: String,
        label: 'Creation date of the Issue',
      },
    }), { tracker: Tracker });
  }
}

export const Issues = new IssuesCollection();
