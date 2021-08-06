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
]