const jwt = require('jsonwebtoken');

const jwtDecoded = async(token) => {
    return new Promise((resolve, reject)=> {
        jwt.verify(token, process.env.SECRET, (err, decoded)=>{
            console.log("ok !!!");
            if(err){
                reject(err);
            }
            resolve(decoded);
        });
    });
};

const verifyJwt = async(req, res, next)=> {
    const auth = req.headers['authorization'];
    if(!auth){
        return res.sendStatus(401);
    }
    const token =  auth.split(' ')[1];
    try {
        const user = await jwtDecoded(token)
        req.session.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = verifyJwt;