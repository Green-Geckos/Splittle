import {Group}  from './objects/Group.js';
import {User} from './objects/User.js';
import {Expense} from './objects/Expense.js';
import {getJSONData, putJSONData} from './fileServer.js';

/**
 * @param {address} createdBy -> User Address
 * @param {string} groupName -> group Name given by user
 * @param {address[]} members  -> list of user address in the group
 */
export function createGroupHandler(createdBy, groupName, members){
    const data = getJSONData();
    const group = new Group(data.groups.length,  createdBy, groupName, members);
    group.addGroup(data);
    putJSONData(data);
}

export function addExpenseHandler(paidBy, groupId, splitDetails, amountPaid, expenseTitle){
    const data = getJSONData();
    const expense = new Expense(data.expenses.length, expenseTitle, amountPaid, groupId, paidBy, splitDetails);
    expense.addExpense(data);
    putJSONData(data);
}

export function addUserHandler(userAddress, username){
    const user = new User(userAddress, username);
    const data = getJSONData();
    user.addUser(data);
    putJSONData(data);
}

export function settleHandler(from, to, amount, groupId){
    const data = getJSONData();
   //const groupIndex = data.groups.findIndex((ele) => ele.groupId === groupId);
    //const group = data.groups[groupIndex];
    let paidBy = {};
    paidBy[from] = 100;
    let paidTo = {};
    paidTo[to] = 100;

    console.log(paidBy, paidTo);
    let expense = new Expense(data.expenses.length, `${from} and ${to} settlement`, amount, groupId, paidBy, paidTo);
    expense.addSettleExpense(data);
    putJSONData(data);
}



export function groupRepresentationData(groupId, userAddress){
    // Return JSON Metadata
    const data = getJSONData();
    const returnData = {};
    const groupIndex = data.groups.findIndex((ele) => {
        console.log(ele.groupId, groupId);
        return ele.groupId === groupId;
    });

    console.log(groupIndex, JSON.stringify(data.groups));
    const group =  data.groups[groupIndex];
    returnData.groupId = groupId;
    returnData.groupName = group.groupName;
    returnData.user = userAddress;

    returnData.members = group.members;

    // Expense and related calculations
    const expenses = data.expenses.filter((exp) => exp.groupId === groupId);
    returnData.userBalancesData ={};

    returnData.expenses = [];

    group.members.forEach(mem => {
        returnData.userBalancesData[mem] = 0;
    });

    expenses.forEach(exp => {
        let contribution = exp.paidBy[userAddress]*exp.amountPaid/100;
        if(!contribution) contribution = 0;
        group.members.forEach(mem => {
            if(mem != userAddress){
                // Amount should take from this user 
                let amountTake = contribution*exp.splitDetails[mem]/100;

                // Member contribution
                let memContribution = exp.paidBy[mem]*exp.amountPaid/100;

                if(!memContribution) memContribution = 0;

                // Amount this member will take from user

                let amountGive = memContribution*exp.splitDetails[userAddress]/100;

                if(!amountTake) amountTake = 0;
                if(!amountGive) amountGive = 0;

                returnData.userBalancesData[mem] += (amountTake - amountGive);
            }
        });
        returnData.expenses.push({
            "title" : exp.expenseTitle, 
            "amountPaidByUser" : contribution 
        });
    }); 

    return returnData;
}

export function landingPageHandler(userAddress) {
    const data = getJSONData();
    const returnData = {};
    returnData.groups = [];
    const groups = data.groups.forEach(gp => {
        const ret = {};
        ret[gp.groupId] = gp.groupName;
        returnData.groups.push(ret);
    });
    returnData.firstGroupRep = {};
    if(data.groups.length >= 1){
        returnData.firstGroupRep = groupRepresentationData(data.groups[0].groupId, userAddress);
    }
    return returnData;
}