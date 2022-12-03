
export class Expense{
    constructor(expenseId, amountPaid, groupId, paidBy, splitDetails){
        this.expenseId = expenseId;
        this.AmountPaid = amountPaid;
        this.groupId = groupId;
        this.paidBy = paidBy;
        this.splitDetails = splitDetails;
    }
    addExpense(data){
        data.expenses.push(this);
        for(let i = 0; i < this.paidBy.length; i++){
            const address = Object.keys(this.paidBy)[i];
            const paid = this.paidB[address];
            const owe = this.splitDetails[address];
            data.userDetails.address+= (paid-owe);
        }
        const groupIndex = data.groups.findIndex((ele) => ele.groupId === this.groupId);
        data.groups[groupIndex].expenseIdS.push(this.expenseId);
    }
    deleteExpense(data){
        //Will do later
    }
}