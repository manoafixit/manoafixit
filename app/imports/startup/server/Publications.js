import { _ } from 'meteor/underscore';
import { Issues } from '../../api/IssuesCollection/IssuesCollection.js';

const collections = [
  Issues,
];

// Publish all ManoaFixIt Collections.
_.forEach(collections, collection => collection.publish());
