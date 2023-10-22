import jwt from "jsonwebtoken"

const auth = (req,res,next) => {
    const token =  req.header('Authorization');
    if(!token){
        res.send("access denied");
    }else{
        next()
    }
    

}

export default auth