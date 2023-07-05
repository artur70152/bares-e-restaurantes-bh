module.exports={

    dialect:'postgres',
    
    host:'localhost',
    
    username:'postgres',
    
    password:'docker',
    
    database:'baresrestaurantes',
    
    port:'5435',
    //essa port depende da que voce definiu quando criou o docker 
    
    define:{
        //as colunas created app e updated app são por causa do timestamps
        timestamps:true,
    //define o padrao de nome de tabelas e colunas
    // underscore user_groups ao inves de UserGroups
    underscored:true,
    underscoredAll:true,
    },
    
    
    
    }