import User from "../models/Users";


import jwt from "jsonwebtoken";
import * as yup from 'yup'

class SessionController{
    
async store(req,res){
    const authconfig={
        secret:'aa',
        expiresIn:'7d'
        
        }

   
    const schema=yup.object().shape({
        
        email:yup.string().email().required(),
        password: yup.string().required()
        
        })
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'validation fails'})
         
        }
        
const {email,password}=req.body

const user=await User.findOne({where:{email},
 

})

if(!user){
    return res.status(401).json({error:'User not found'})
}
if(!(await user.checkPassword(password))){
    return res.status(401).json({error:'password does not match'})
}

const {id, name}=user;
req.user = user;
//console.log(user)
return res.json({
    user:{
        id,name,email
    },
    token: jwt.sign({id},authconfig.secret,{
        expiresIn:authconfig.expiresIn,
    })
})
}


}
export default new SessionController();