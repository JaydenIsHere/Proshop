import bcrypt from 'bcryptjs'
const user =[//demon data
    {
        name:'Admin User ',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Mark',
        email:'Mark@example.com',
        password:bcrypt.hashSync('123456',10),

    },
    {
        name:'Jane Doe',
        email:'Jane@example.com',
        password:bcrypt.hashSync('123456',10),

    }
]

export default user