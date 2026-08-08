const db = require('../config/db');
const User = require('../models/user.model');


// Get all users
async function findAll() {

    const result = await db.query(`
        SELECT id, username, email, first_name, last_name, is_active, created_at, updated_at
        FROM users
        ORDER BY username
    `);

    return result.rows.map(row => new User(row));

}


// Get user by ID
async function findById(id) {

    const result = await db.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return new User(result.rows[0]);

}


// Get user by username
async function findByUsername(username) {

    const result = await db.query(
        `
        SELECT *
        FROM users
        WHERE username = $1
        `,
        [username]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return new User(result.rows[0]);

}


// Create user
async function create(user) {

    const result = await db.query(
        `
        INSERT INTO users
        (
            username,
            email,
            password
        )
        VALUES
        ($1, $2, $3)
        RETURNING *
        `,
        [
            user.username,
            user.email,
            user.password
        ]
    );

    return new User(result.rows[0]);

}


// Update user
async function update(id, user) {

    const result = await db.query(
        `
        UPDATE users
        SET
            username = $1,
            email = $2,
            password = $3,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *
        `,
        [
            user.username,
            user.email,
            user.password,
            id
        ]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return new User(result.rows[0]);

}


// Delete user
async function remove(id) {

    const result = await db.query(
        `
        DELETE FROM users
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return new User(result.rows[0]);

}


module.exports = {
    findAll,
    findById,
    findByUsername,
    create,
    update,
    remove
};