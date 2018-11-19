import SimpleSchema from 'simpl-schema';
import Meteor from 'meteor/meteor';
import _ from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';
import BaseCollection from '../BaseCollection/BaseCollection';

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
        type: Array,
        label: 'Issue Tags',
        optional: true,
        maxCount: 3, // Maximum of 3 tags
      },
      'tags.$': String,
      likes: {
        type: Number,
        label: 'Issue Likes',
        defaultValue: 0,
      },
      status: {
        type: String,
        label: 'Issue Status',
        allowedValues: ['Open', 'Acknowledged', 'Ongoing', 'Resolved', 'Declined', 'Duplicate'],
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
      owner: {
        type: String,
        label: 'Poster of the Issue',
      },
    }, { tracker: Tracker },
);

class IssuesCollection extends BaseCollection {
  constructor() {
    super('Issues', IssuesSchema);
  }

  /**
   * Calls db.colleciton.insert()
   * @param { Object } data The issue data to insert.
   * @param callback The callback function that handles data insertion.
   * @returns { docID } The _id of the document we inserted.
   */
  insert(data, callback) {
    const { title, description, tags, likes, status = 'Open', lat, long, owner, createdAt } = data;
    const issueID = this.collection.insert({
      title,
      description,
      tags,
      likes,
      status,
      lat,
      long,
      createdAt,
      owner,
    }, callback);
    return issueID;
  }

  /**
   * Calls db.collection.update()
   * All collections must provide a [callback] function.
   * @param { Object } selector A MongoDB query selector.
   * @param { Object } modifier A MongoDB modifier.
   * @param { Object } options The options for update(). Set to false for all options.
   * @param { callback } callback The Callback function that handles update status.
   * @returns {boolean} true
   * @throws { Meteor.Error } if there is no callback function provided.
   */
  update(issueID, data, options = { multi: false, upsert: false }, callback) {
    if (callback === undefined) {
      throw new Meteor.Error(`${this.collectionName}'s update() method must provide a callback`);
    } else {
      const { title, description, tags, likes, status } = data;
      const updated = {};
      if (title) {
        updated.title = title;
      }
      if (description) {
        updated.description = description;
      }
      if (tags) {
        updated.tags = tags;
      }
      if (_.isNumber(likes)) {
        updated.likes = likes;
      }
      if (status) {
        updated.status = status;
      }
      this.collection.update(issueID, { $set: updated }, options, callback);
      return true;
    }
  }
}

export const Issues = new IssuesCollection();
