
export class Expense{
    constructor(expenseId, paidBy, groupId, paymentDetails){
        this.expenseId = expenseId;
        this.paidBy = paidBy;
        this.groupId = groupId;
        this.paymentDetails = paymentDetails;
    }
    addExpense(data){
        data.expenses.push(this);
    }
    deleteExpense(data){
        //Will do later
    }
}