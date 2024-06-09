'use strict';
const mysql = require("../utils/db.js");

/**
 * Gerenciamento de Planos
 */

// Adicionar Plano
exports.planoPOST = function(req, res) {
  const body = req.body;
  mysql.query(
    "INSERT INTO plano (nome, descricao, valor) VALUES (?, ?, ?)", 
    [body.nome, body.descricao, body.valor], 
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send({ id: result.insertId });
      }
    }
  );
};

// Listar Planos
exports.planoGET = function(req, res) {
  mysql.query("SELECT * FROM plano", function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

// Consultar Plano por ID
exports.plano_idGET = function(req, res) {
  const id = req.params.id;
  mysql.query("SELECT * FROM plano WHERE id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result[0]);
    }
  });
};

// Atualizar Plano por ID
exports.plano_idPUT = function(req, res) {
  const id = req.params.id;
  const body = req.body;
  mysql.query(
    "UPDATE plano SET nome = COALESCE(?, nome), descricao = COALESCE(?, descricao), valor = COALESCE(?, valor) WHERE id = ?", 
    [body.nome, body.descricao, body.valor, id], 
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ id: id });
      }
    }
  );
};

// Deletar Plano por ID
exports.plano_idDELETE = function(req, res) {
  const id = req.params.id;
  mysql.query("DELETE FROM plano WHERE id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ deleted: id });
    }
  });
};

// Consultar Plano de um Cliente
exports.cliente_planoGET = function(req, res) {
  const id = req.params.id;
  mysql.query("SELECT plano.* FROM plano INNER JOIN cliente ON plano.id = cliente.plano WHERE cliente.id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result[0]);
    }
  });
};
