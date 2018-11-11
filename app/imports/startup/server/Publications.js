import { _ } from 'meteor/underscore';
import { ManoaFixIt } from '../../api/ManoaFixIt/ManoaFixIt';

// Publish all ManoaFixIt Collections.
_.forEach(ManoaFixIt.collections, collection => collection.publish());
