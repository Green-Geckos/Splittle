class Group{
    Group(groupId, createdBy){
        this.groupId = groupId;
        this.createdBy = createdBy;
        this.members = [];
        this.expensesIds = [];
    }
    deleteGroup(data){
        //Will do later
    }
    addMember(data, userId){
        data.groups.members.push(userId);
    }
    addExpense(data, expenseId){
        data.groups.expensesIds.push(expenseId);
    }
}