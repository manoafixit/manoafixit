import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import BaseCollection from '../BaseCollection/BaseCollection';

export const IssueRepliesSchema = new SimpleSchema(
    {
      issue_id: {
        type: String,
        label: 'ID of the Issue',
        min: 4, // Minimum 4 characters to prevent spam
        max: 65,
      },
      reply: {
        type: String,
        label: 'Reply to issue',
        max: 1000,
        optional: true,
      },
      createdAt: {
        type: String,
        label: 'Creation date of the Reply',
      },
      owner: {
        type: String,
        label: 'Poster of the Reply',
      },
    }, { tracker: Tracker },
);

class IssueRepliesCollection extends BaseCollection {
  constructor() {
    super('IssueReplies', IssueRepliesSchema);
  }

  insert(data, callback) {

  }

}

export const IssueReplies = new IssueRepliesCollection();
