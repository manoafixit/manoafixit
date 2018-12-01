/* eslint-disable no-console */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/Roles/Roles';

let superAdminUserID = '';

function createSuperAdminUser() {
  const username = Meteor.settings.superAdmin.username;
  const email = Meteor.settings.superAdmin.email;
  const password = '3qZ98gnUXNj8dvPm';
  const userID = Accounts.createUser({
    username: username,
    email: email,
    password: password,
  });
  Roles.addUsersToRoles(userID, ROLE.SUPERADMIN);
  superAdminUserID = userID;
  console.log(`Super Admin Initialized - Username: ${username} | Email: ${email}`);
}

if (superAdminUserID === '' && !Meteor.users.findOne()) {
  createSuperAdminUser();
}
