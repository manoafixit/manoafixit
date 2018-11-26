import _ from 'lodash';
import { Issues } from '../../api/IssuesCollection/IssuesCollection.js';
import { IssueReplies } from '../../api/IssueRepliesCollection/IssueRepliesCollection';

const collections = [
  Issues,
  IssueReplies,
];

// Default Publishing
_.forEach(collections, collection => collection.publish());
