class User{
    User(userId, address, name){
        this.userId = userId;
        this.address = address;
        this.name = name;
    }
    addUser(data){
        data.userDetails.push(this);
    }
}