const bcrypt = require('bcrypt');

const Users = [
    {
        name: "admin",
        email: "admin@admin.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "shreyas",
        email: "shreyas@xyz.com",
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: "user",
        email: "user@xyz.com",
        password: bcrypt.hashSync('123456', 10)
    },
]

module.exports = Users;