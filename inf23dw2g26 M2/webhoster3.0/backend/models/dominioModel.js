'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dominio = sequelize.define('Dominio', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clientes',
        key: 'id'
      }
    },
    plano: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_registro: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data_expiracao: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  
  Dominio.associate = function(models) {
    Dominio.belongsTo(models.Cliente, { foreignKey: 'cliente_id' });
  };

  return Dominio;
};
