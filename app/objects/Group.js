export class Group{
    constructor(groupId, createdBy){
        this.groupId = groupId;
        this.createdBy = createdBy;
        this.members = [];
        this.expensesIds = [];
    }
    deleteGroup(data){
        //Will do later
    }
    addMember(data, address){
        data.groups.members.push(address);
    }
    addExpense(data, expenseId){
        data.groups.expensesIds.push(expenseId);
    }
}