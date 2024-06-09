'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  
  Cliente.associate = function(models) {
    Cliente.hasMany(models.Dominio, { foreignKey: 'cliente_id' });
    Cliente.hasMany(models.Pagamento, { foreignKey: 'cliente_id' });
  };

  return Cliente;
};
