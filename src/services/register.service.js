const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository');

async function register(data){
    const existingUser =
        await userRepository.findByUsername(
            data.username
        );

    if(existingUser){
        throw new Error(
            'Username already exists'
        );
    }

    const hashPassword =
        await bcrypt.hash(
            data.password,
            10
        );

    return await userRepository.create({
        
        username:data.username,
        email:data.email,
        password:hashPassword

    });

}
module.exports = {
    register
};