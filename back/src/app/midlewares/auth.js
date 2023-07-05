import jwt from 'jsonwebtoken'

//promisify pega uma função de callback  e a transforma numa outra 
//que pode colocar async e await
import{promisify} from 'util'


export default async (req,res,next)=>{

const authConfig={
    secret:'aa',
    expiresIn:'7d'
    
    }

    //console.log(req.headers.authorization)
    //no imsomnia colocar o token o auth é a mesma coisa que coloca-lo no header
const authHeader=req.headers.authorization
//console.log(authHeader)
if(!authHeader){
    return res.status(401).json({error:'token not provided'})
}

const [, token]=authHeader.split(' ')
//console.log(token)
try{
 // o primeiro parametro do promisify retorna uma função (jwt.verify)
//o segundo parametro é a funçao retornada (token, authConfig.secret)
//O método jwt.verify é utilizado para verificar a validade do token.
// É utilizada a função promisify para converter jwt.verify em uma 
//função assíncrona que pode ser usada com await. A função jwt.verify 
//recebe dois parâmetros: o token a ser verificado e a chave secreta 
//definida em authConfig.secret.
//Se o token for válido, o objeto decoded contendo as informações
// decodificadas do token é armazenado na variável decoded.
// Neste código, é mostrado um console.log para exibir as informações
// decodificadas do token.
//Em seguida, o ID do usuário é extraído das informações decodificadas
// do token e é adicionado à propriedade userId do objeto req, que
// representa a requisição atual. Essa propriedade userId pode ser 
//acessada em outros middlewares ou rotas subsequentes para identificar
// o usuário autenticado.
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)
  //  console.log(decoded)
  //console.log(req.id)
req.userId=decoded.id
//console.log(req.userId)
//console.log(token)
//Por fim, a função next() é chamada para passar o controle para o 
//próximo middleware na cadeia de middlewares.
return next();
} catch (err){

}return res.status(401).json({error:'token invalid'})



}