import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../Roles/Roles';
import BaseCollection from '../BaseCollection/BaseCollection';

class UsersCollection extends BaseCollection {
  constructor() {
    super();
    this.collectionName = 'UsersCollection';
  }

  // createAdminAccount(username, email, password) {
  //   const adminID = Accounts.createUser({ username, email, password });
  //   console.log(adminID);
  //   Roles.addUsersToRoles(adminID, ROLE.ADMIN);
  //   return true;
  // }

  publish() {
    Meteor.publish(this.collectionName, () => Meteor.users.find());
  }

  addUserToRole(id, role) {
    Roles.addUsersToRoles(id, role);
  }

  getAllAdminsOnly() {
    const cursor = Roles.getUsersInRole(ROLE.ADMIN);
    const output = [];
    cursor.forEach((admin) => output.push(admin));
    return output;
  }

  getAllUsersOnly() {
    const cursor = Roles.getUsersInRole(ROLE.USER);
    const output = [];
    cursor.forEach((user) => output.push(user));
    return output;
  }

  getAllUsers() {
    return Meteor.users.find().fetch();
  }
}

export const Users = new UsersCollection();
