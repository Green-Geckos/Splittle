export class User{
    constructor(address, userName, ens){
        this.address = address;
        this.name = userName;
        this.balance = 0;
        this.ens = ens;
        //this.groups = [];
    }
    addUser(data){
        data.userDetails.push(this);
    }
}