module.exports = {
  up: (queryInterface, Sequelize)=> {
    
      return queryInterface.createTable('places', { 
        id: {
      type:Sequelize.INTEGER,
      allowNull:false,
     
        },
      nome:{
      type:Sequelize.STRING,
      allowNull:false,
      },
      tipo:{
      type:Sequelize.STRING,
      allowNull:false,
      },
      endereço:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      preços:{
        type:Sequelize.STRING,
        allowNull:false,
        },
      created_at:{
      type:Sequelize.DATE,
      allowNull:false,
      },

      updated_at:{
      type:Sequelize.DATE,
      allowNull:false,
      },

     

      });
     
  },

 down: queryInterface=> {
    
    return queryInterface.dropTable('places');
    
  }
};
