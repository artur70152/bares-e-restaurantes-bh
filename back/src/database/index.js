// esse arquivo é para realizar a conexao com o banco de dados e 
// importar os models

import Sequelize from "sequelize";



import databaseConfig from '../config/database'

import User from "../app/models/Users";
import Places from "../app/models/Places";
//import Products from "../app/models/products";

const models=[User,Places];
class Database{
constructor(){
    this.init() 

}
init(){
    // estabelece a conexao com o banco de dados
//this.connection é um objeto que contem todos os modelos registrados
//e associados a conexao do banco de dados 
this.connection=new Sequelize(databaseConfig)
    //this.connection é a variavel que sera usada como parametro nos
    //nos models para realizar a conexao 
    models
    .map(model=>model.init(this.connection))
//so vai chamar o metodo associate se o metodo associate existir
//(&& model.associate)
.map(model=>model.associate && model.associate(this.connection.models))
}

}
export default new Database()