import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            username: 'reinmar8',
            password: bcrypt.hashSync('123456'),
        },
        {
            username: 'testuser',
            password: bcrypt.hashSync('123456'),
        }
    ]
}


export default data;