export class User{
    constructor(address, name){
        this.address = address;
        this.name = name;
    }
    addUser(data){
        data.userDetails.push(this);
    }
}