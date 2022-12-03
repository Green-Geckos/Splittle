export class User{
    constructor(address, userName){
        this.address = address;
        this.name = userName;
        this.balance = 0;
    }
    addUser(data){
        data.userDetails.push(this);
    }
}