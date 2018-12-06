import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

/**
 * Abstract superclass for all Collections.
 */
class BaseCollection {
  /**
   * Superclass constructor for all Collections.
   * @param {string} name The name of the collection defined by a subclass.
   * @param {Simple-Schema} schema The schema for validating document fields.
   */
  constructor(name, schema) {
    this.collectionName = `${name}Collection`;
    this.collection = new Mongo.Collection(`${name}Collection`);
    this.schema = schema;
    this.collection.attachSchema(this.schema);
  }

  /**
   * Publishes the entire collection.
   */
  publish() {
    Meteor.publish(this.collectionName, () => this.collection.find());
  }

  /**
   * Subscribes to the entire collection.
   */
  subscribe() {
    Meteor.subscribe(this.collectionName);
  }

  /**
   * Calls db.collection.find()
   * @param { Object } selector A MongoDB query selector.
   * @param { Object } options MongoDB options.
   * @returns { Mongo.Cursor }
   */
  find(selector, options) {
    const query = (typeof selector === 'undefined') ? {} : selector;
    return this.collection.find(query, options);
  }

  /**
   * Calls db.collection.findOne()
   * @param { Object }selector A MongoDB query selector.
   * @param { Object }options MongoDB options.
   * @returns { Mongo.Cursor }
   */
  findOne(selector, options) {
    const query = (typeof selector === 'undefined') ? {} : selector;
    return this.collection.findOne(query, options);
  }

  /**
   * Calls db.collection.insert()
   * All collections must override this method with a [callback].
   * @returns {string}
   */
  insert() {
    return 'Insert method must be overridden for this collection';
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
  update(selector, modifier, options = { multi: false, upsert: false }, callback) {
    if (callback === undefined) {
      throw new Meteor.Error(`${this.collectionName}'s update() method must provide a callback`);
    } else {
      const query = (typeof selector === 'undefined') ? {} : selector;
      this.collection.update(query, modifier, options, callback);
      return true;
    }
  }

  /**
   * Calls db.collection.remove()
   * All collections must provide a [callback] function.
   * @param { Object }selector A MongoDB query selector.
   * @param { callback } callback - The Callback function that handles remove status.
   * @returns { boolean } true
   */
  remove(selector) {
    const doc = this.findOne(selector);
    this.collection.remove({ _id: doc._id });
    return true;
  }

  /**
   * Returns the number of documents in this collection.
   * @returns { Number } The Number of documents in this collection.
   */
  count() {
    return this.collection.find().count();
  }

  /**
   * Returns an array of all the documents in this collection.
   * @returns { Array }
   */
  getCollectionDocuments(selector, options) {
    const query = (typeof selector === 'undefined') ? {} : selector;
    return this.collection.find(query, options).fetch();
  }
}

export default BaseCollection;
