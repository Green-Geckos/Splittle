
export class Expense{
    constructor(expenseId, expenseTitle,  amountPaid, groupId, paidBy, splitDetails){
        this.expenseId = expenseId;
        this.amountPaid = amountPaid;
        this.groupId = groupId;
        this.paidBy = paidBy;
        this.splitDetails = splitDetails;
        this.expenseTitle = expenseTitle;
    }
    addExpense(data){
        data.expenses.push(this);
        const addresses = Object.keys(this.paidBy);
        for(let i = 0; i < addresses.length; i++){
            const address = addresses[i];
            let paid = this.paidBy[address];
            let owe = this.splitDetails[address];
            if(!paid) paid = 0;
            if(!owe) owe = 0;
            const userIndex = data.userDetails.findIndex((ele) => ele.address === address);
            data.userDetails[userIndex].balance += (paid-owe)*this.amountPaid/100;
        }
        const groupIndex = data.groups.findIndex((ele) => ele.groupId === this.groupId);
        data.groups[groupIndex].expensesIds.push(this.expenseId);
    }

    addSettleExpense(data){
        data.expenses.push(this);
        const from = Object.keys(this.paidBy)[0];
        const to = Object.keys(this.splitDetails)[0];

        const amount = this.amountPaid;
        const fromUserIndex = data.userDetails.findIndex((ele) => ele.address === from);
        const toUserIndex = data.userDetails.findIndex((ele) => ele.address === to);

        data.userDetails[fromUserIndex].balance += amount;
        data.userDetails[toUserIndex].balance -= amount;

    }
}