import jwt from 'jsonwebtoken'

export const verifyToken=async(req,reply)=>{
    try{
        const authHeader=req.headers['authorization'];
        if(!authHeader  || !authHeader.startWith('bearer')){
            return reply.status(401).send({message:'Acces token required'})
        }
        const Token=authHeader.split('')[1];

    }catch(err){
        return reply.status(403).send({message:'Invalid or expired Token'})
    }
}