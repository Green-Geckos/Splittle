import {Group}  from './objects/Group.js';
import {User} from './objects/User.js';
import {Expense} from './objects/Expense';
import {getJSONData, putJSONData} from './fileServer.js';

/**
 * 
 * @param {address} createdBy -> User Address
 * @param {string} groupName -> group Name given by user
 * @param {address[]} members  -> list of user address in the group
 */
function createGroupHandler(createdBy, groupName, members){
    //groupId
    const group = new Group(groupId, createdBy, groupName, members);
    const data = getJSONData();
    group.addGroup(data);
    putJSONData(data);
}
function settleHandler(from, to, amount){
    
}
function addExpenseHandler(paidBy, groupId, paymentDetails){
    //expenseId
    const expense = new Expense(expenseId, paidBy, groupId, paymentDetails);
    const data = getJSONData();
    expense.addExpense(data);
    putJSONData(data);
}
function addUserHandler(){
    const user = new User(address, name);
    const data = getJSONData();
    user.addUser(data);
    putJSONData(data);
}
