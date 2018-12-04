import _ from 'lodash';
import { Issues } from '../../api/IssuesCollection/IssuesCollection.js';
import { IssueReplies } from '../../api/IssueRepliesCollection/IssueRepliesCollection';
import { Users } from '../../api/UsersCollection/UsersCollection';

const collections = [
  Issues,
  IssueReplies,
  Users,
];

// Default Publishing
_.forEach(collections, collection => collection.publish());
