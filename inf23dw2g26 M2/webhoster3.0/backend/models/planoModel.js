'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plano = sequelize.define('Plano', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {});

  return Plano;
};
