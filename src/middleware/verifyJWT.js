const jwt = require('jsonwebtoken');

exports.verifyJWT = (req,res,next) => {
    const reqHeaders = req.headers.authorization;

    if(!reqHeaders) return res.status(401).send({message:'Unauthorized'});
    const encryptEmail = reqHeaders.split(' ')[1];

    jwt.verify(encryptEmail,process.env.JWT_TOKEN,(err,decode)=>{
        if(err) return res.status(401).send({message:'Unauthorized'});
        req.decode = decode;
        return next()
    })
};