import { _ } from 'meteor/underscore';
import { Issues } from '../../api/IssuesCollection/IssuesCollection.js';

const collections = [
  Issues,
];

// Default Publishing
_.forEach(collections, collection => collection.publish());

// Publishing Issues by filter
// Issues.publishNewest();
// Issues.publishOldest();
// Issues.publishMostLiked();
// Issues.publishLeastLiked();
