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

  /**
   * Calls db.colleciton.insert()
   * @param { Object } data The issue reply data to insert.
   * @param callback The callback function that handles data insertion.
   * @returns { docID } The _id of the document we inserted.
   */
  insert(data, callback) {
    const { issue_id, reply, createdAt, owner } = data;
    const issueID = this.collection.insert({
      issue_id,
      reply,
      createdAt,
      owner,
    }, (error) => { console.log(error); });
    console.log(`From IssueReplies Collection: ${issue_id} | ${reply} | ${createdAt} | ${owner}`);
    return issueID;
  }
}

export const IssueReplies = new IssueRepliesCollection();
