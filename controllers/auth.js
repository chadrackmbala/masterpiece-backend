const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const authCtrl = async(req, res, next) => {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(401).json({ message: 'Username or password is required' });
        }

        const user = await prisma.users.findUnique({
            where: {
                email
            }
        });
        if(!user){
            return res.status(401).json({ message: 'User not found' })
        }

        const passwordHash = await bcrypt.compare(password, user.motDePasse);
        if(!passwordHash) {
            return res.status(401).json({ message : 'Bad password' });
        }

        const token = jwt.sign(user, process.env.SECRET, { expiresIn: '30d' });
        const params =  user;
        delete params.motDePasse;
        delete params.comfirmMotDePasse;

        return res.status(200).json({ user: params, token });
    } catch (error) {
        next(error);
    }
};

module.exports = authCtrl;
