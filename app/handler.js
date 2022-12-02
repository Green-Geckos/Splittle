import {Group}  from './objects/Group.js';
import {User} from './objects/User.js';
import {Expense} from './objects/Expense';

/**
 * 
 * @param {address} createdBy -> User Address
 * @param {string} groupName -> group Name given by user
 * @param {address[]} members  -> list of user address in the group
 */
function createGroupHandler(createdBy, groupName, members){
    const group = new Group();
}