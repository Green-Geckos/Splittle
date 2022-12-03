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
    //groupId

    const group = new Group(groupId, createdBy, groupName, members);
    
}
function settleHandler(from, to, amount){
    
}
function addExpenseHandler(paidBy, groupId, paymentDetails){
    //expenseId
    const expense = new Expense(expenseId, paidBy, groupId, paymentDetails);
}
