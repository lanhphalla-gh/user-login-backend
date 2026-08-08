class User {

    constructor(data) {

        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;

        this.first_name = data.first_name;
        this.last_name = data.last_name;

        this.is_active = data.is_active;

        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

    }

}


module.exports = User;