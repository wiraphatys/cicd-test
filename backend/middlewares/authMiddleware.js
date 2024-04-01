const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');


//Create Function for protect routes
exports.protect = async(req,res,next)=>{
    let token;

    //checking header of request
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    
    //token existence ensuring
    if(!token){
        return res.status(401).json({success:false, message: 'Not authorize to access this route'});
    }


    try{
        //Verify Token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user=await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).send({
                success: false,
                message: `Not authorize to access this route`
            })
        }
        next();
    }
    catch(err){
        console.log(err.stack);
        return res.status(401).json({success:false, message:'Not authorize to access this route'});
    }
}




//Create function for granting access to specific roles
exports.authorize=(...roles)=>{
        return(req,res,next)=>{
            if(!roles.includes(req.user.role)){
                return res.status(403).json({
                    success:false,
                    message:`User role ${req.user.role} is not authorized to access this route`
                });
            }
            next();
        }
}