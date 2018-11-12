import SimpleSchema from 'simpl-schema';
// import * as date from 'date-fns';
import { Tracker } from 'meteor/tracker';
import { BaseCollection } from '../../BaseCollection/BaseCollection';

export const IssuesSchema = new SimpleSchema(
    {
      title: {
        type: String,
        label: 'Issue Title',
        min: 5, // Minimum 5 characters to prevent spam
        max: 100,
      },
      description: {
        type: String,
        label: 'Issue Description',
        max: 1000,
        optional: true,
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
        defaultValue: 0,
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
    }, { tracker: Tracker },
);

class IssuesCollection extends BaseCollection {
  constructor() {
    super('Issues', IssuesSchema);
  }
}

export const Issues = new IssuesCollection();
