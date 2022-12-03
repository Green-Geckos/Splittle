
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
            address = Object.keys(this.paidBy)[i];
            paid = this.paidBy.address;
            owe = this.splitDetails.address;
            data.userDetails.address+= (paid-owe);
        }
        //data.groups.expensesIds.push(this.expenseId);
        data.groups[this.groupId].expensesIds.push(this.expenseId);
    }
    deleteExpense(data){
        //Will do later
    }
}