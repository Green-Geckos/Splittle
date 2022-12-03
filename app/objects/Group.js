export class Group{
    constructor(groupId, createdBy, groupName, members){
        this.groupId = groupId;
        this.createdBy = createdBy;
        this.members = members;
        this.groupName = groupName;
        this.expensesIds = [];
    }
    addGroup(data){
        data.groups.push(this);
    }
    deleteGroup(data){
        //Will do later
    }
    addMember(data, address){
        data.groups.members.push(address);
    }
}