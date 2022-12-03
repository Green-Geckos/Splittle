import {Group}  from './objects/Group.js';
import {User} from './objects/User.js';
import {Expense} from './objects/Expense';
import {getJSONData, putJSONData} from './fileServer.js';

/**
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
function addExpenseHandler(paidBy, groupId, splitDetails, amountPaid){
    //expenseId
    const expense = new Expense(expenseId, amountPaid, groupId, paidBy, splitDetails);
    const data = getJSONData();
    expense.addExpense(data);
    putJSONData(data);
}
function addUserHandler(){
    const user = new User(address, userName);
    const data = getJSONData();
    user.addUser(data);
    putJSONData(data);
}
function settleHandler(from, to, amount, groupId){
    const data = getJSONData();
   //const groupIndex = data.groups.findIndex((ele) => ele.groupId === groupId);
    //const group = data.groups[groupIndex];
    let paidBy = {};
    paidBy[from] = amount;
    let paidTo = {};
    paidTo[to] = amount;
    const expense = new Expense(expenseId, amount, groupId, paidBy, paidTo);
    expense.addExpense(data);
    putJSONData();
}