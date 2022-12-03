import {Group}  from './objects/Group.js';
import {User} from './objects/User.js';
import {Expense} from './objects/Expense.js';
import {getJSONData, putJSONData} from './fileServer.js';

/**
 * @param {address} createdBy -> User Address
 * @param {string} groupName -> group Name given by user
 * @param {address[]} members  -> list of user address in the group
 */
export async function createGroupHandler(createdBy, groupName, members, fileCID){
    const data = await getJSONData(fileCID);
    const group = new Group(data.groups.length,  createdBy, groupName, members);
    group.addGroup(data);
    await putJSONData(data);
}

export async function addExpenseHandler(paidBy, groupId, splitDetails, amountPaid, expenseTitle, fileCID){
    const data = await getJSONData(fileCID);
    const expense = new Expense(data.expenses.length, expenseTitle, amountPaid, groupId, paidBy, splitDetails);
    expense.addExpense(data);
    await putJSONData(data);
}

export async function addUserHandler(userAddress, username, ens, fileCID){
    const data = await getJSONData(fileCID);

    // if user already exists
    if(data.userDetails.find(user => user.userAddress === userAddress)){
        return {
            message: "User already exists",
        }
    }
    const user = new User(userAddress, username, ens);
    user.addUser(data);
    await putJSONData(data);
}

export async function settleHandler(from, to, amount, groupId, fileCID){
    const data = await getJSONData(fileCID);
    let paidBy = {};
    paidBy[from] = 100;
    let paidTo = {};
    paidTo[to] = 100;

    let expense = new Expense(data.expenses.length, `${from} and ${to} settlement`, amount, groupId, paidBy, paidTo);
    expense.addSettleExpense(data);
    await putJSONData(data);
}



export async function groupRepresentationData(groupId, userAddress, fileCID){
    // Return JSON Metadata
    const data = await getJSONData(fileCID);
    const returnData = {};
    const groupIndex = data.groups.findIndex((ele) => {
        return ele.groupId === groupId;
    });

    const group =  data.groups[groupIndex];
    returnData.groupId = groupId;
    returnData.groupName = group.groupName;

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

                let memContribution = exp.paidBy[mem]*exp.amountPaid/100;

                if(!memContribution) memContribution = 0;

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

export async function landingPageHandler(userAddress, fileCID) {
    const data = await getJSONData(fileCID);
    const returnData = {};
    returnData.groups = {}
    data.groups.forEach(async gp => {
        returnData.groups[gp.groupId] = await groupRepresentationData(gp.groupId, userAddress, fileCID);
    });
    returnData.user = data.userDetails.find((ele) => ele.address === userAddress);
    return returnData;
}