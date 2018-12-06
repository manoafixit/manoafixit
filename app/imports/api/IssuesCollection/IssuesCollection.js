import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { _ } from 'meteor/erasaur:meteor-lodash';
import BaseCollection from '../BaseCollection/BaseCollection';
import { STATUS } from './IssueStatuses';

export const IssuesSchema = new SimpleSchema(
    {
      title: {
        type: String,
        label: 'Issue Title',
        min: 4, // Minimum 4 characters to prevent spam
        max: 65,
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
        maxCount: 4, // Maximum of 4 tags
      },
      'tags.$': {
        type: String,
        max: 20, // Each tag String can only contain 20 max characters
      },
      likes: {
        type: Number,
        label: 'Issue Likes',
        defaultValue: 0,
      },
      status: {
        type: String,
        label: 'Issue Status',
        allowedValues: [`${STATUS.OPEN}`, `${STATUS.ACKNOWLEDGED}`, `${STATUS.ONGOING}`, `${STATUS.RESOLVED}`,
          `${STATUS.DUPLICATE}`, `${STATUS.REMOVED}`],
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
      // likedBy: {
      //   type: Object,
      //   label: 'List of User IDs who liked the Issue',
      //   optional: true,
      // },
      likedBy: {
        type: Array,
        label: 'Array of User IDS who liked the Issue',
        optional: true,
      },
      'likedBy.$': {
        type: String,
      },
    }, { tracker: Tracker },
);

class IssuesCollection extends BaseCollection {
  constructor() {
    super('Issues', IssuesSchema);
  }

  /**
   * Calls db.collection.insert()
   * @param { Object } data The issue data to insert.
   * @param callback The callback function that handles data insertion.
   * @returns { docID } The _id of the document we inserted.
   */
  insert(data, callback) {
    const { title, description, tags, likes, status = 'Open', lat, long, owner, createdAt, likedBy } = data;
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
      likedBy,
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
   */
  update(issueID, data, options, callback) {
    if (callback === undefined) {
      // eslint-disable-next-line no-console
      console.log(`${this.collectionName}'s update() method must provide a callback`);
      return false;
    }
    let setOptions;
    if (options === undefined) {
      setOptions = { multi: false, upsert: false };
    } else {
      setOptions = options;
    }
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
    this.collection.update({ _id: issueID }, { $set: updated }, setOptions, callback);
    return true;
  }

  increaseLikes(issueID, data, options, callback) {
    if (callback === undefined) {
      // eslint-disable-next-line no-console
      console.log(`${this.collectionName}'s increaseLikes() method must provide a callback`);
      return false;
    }
    let setOptions;
    if (options === undefined) {
      setOptions = { multi: false, upsert: false };
    } else {
      setOptions = options;
    }
    this.collection.update(
        issueID,
        {
          $push: { likedBy: data },
          $inc: { likes: 1 },
        },
        setOptions,
        callback,
    );
    return true;
  }

  decreaseLikes(issueID, data, options, callback) {
    if (callback === undefined) {
      // eslint-disable-next-line no-console
      console.log(`${this.collectionName}'s decreaseLikes() method must provide a callback`);
      return false;
    }
    let setOptions;
    if (options === undefined) {
      setOptions = { multi: false, upsert: false };
    } else {
      setOptions = options;
    }
    this.collection.update(
        issueID,
        {
          $pull: { likedBy: data },
          $inc: { likes: -1 },
        },
        setOptions, callback,
    );
    return true;
  }
}

export const Issues = new IssuesCollection();
