export class User{
    constructor(address, userName){
        this.address = address;
        this.name = userName;
        this.balance = 0;
        this.groups = [];
    }
    addUser(data){
        data.userDetails.push(this);
    }
}