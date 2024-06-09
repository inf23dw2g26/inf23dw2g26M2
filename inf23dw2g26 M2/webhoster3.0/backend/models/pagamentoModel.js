'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pagamento = sequelize.define('Pagamento', {
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clientes',
        key: 'id'
      }
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    data_pagamento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    metodo_pagamento: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  
  Pagamento.associate = function(models) {
    Pagamento.belongsTo(models.Cliente, { foreignKey: 'cliente_id' });
  };

  return Pagamento;
};
