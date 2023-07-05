import User from '../models/Users';
//yup é usado para fazer validações nome obrigatorio e etc...


import * as yup from 'yup'
class UserController{

async store(req, res){
// o yup segue o schema validation,estamos validando um objeto(req.body)
//depois declaramos o fomato que o objeto tem que ter: object().shape()


const schema=yup.object().shape({
name:yup.string().required(),
email:yup.string().email().required(),
password: yup.string().required().min(3),

})
if(!(await schema.isValid(req.body))){
    return res.status(400).json({error:'validation fails'})
 
}
const user = await User.findByPk(req.userId);


const {id,name,email}=await User.create(req.body)

return res.json({id,name,email})
}



}


export default new UserController();