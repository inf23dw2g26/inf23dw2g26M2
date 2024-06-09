'use strict';
const mysql = require("../utils/db.js");

/**
 * Gerenciamento de Domínios
 */

// Adicionar Domínio
exports.dominioPOST = function(req, res) {
  const body = req.body;
  mysql.query(
    "INSERT INTO dominio (nome, cliente_id, plano, data_registro, data_expiracao) VALUES (?, ?, ?, ?, ?)", 
    [body.nome, body.cliente_id, body.plano, body.data_registro, body.data_expiracao], 
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send({ id: result.insertId });
      }
    }
  );
};

// Listar Domínios
exports.dominioGET = function(req, res) {
  mysql.query("SELECT * FROM dominio", function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

// Consultar Domínio por ID
exports.dominio_idGET = function(req, res) {
  const id = req.params.id;
  mysql.query("SELECT * FROM dominio WHERE id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result[0]);
    }
  });
};

// Atualizar Domínio por ID
exports.dominio_idPUT = function(req, res) {
  const id = req.params.id;
  const body = req.body;
  mysql.query(
    "UPDATE dominio SET nome = COALESCE(?, nome), cliente_id = COALESCE(?, cliente_id), plano = COALESCE(?, plano), data_registro = COALESCE(?, data_registro), data_expiracao = COALESCE(?, data_expiracao) WHERE id = ?", 
    [body.nome, body.cliente_id, body.plano, body.data_registro, body.data_expiracao, id], 
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ id: id });
      }
    }
  );
};

// Deletar Domínio por ID
exports.dominio_idDELETE = function(req, res) {
  const id = req.params.id;
  mysql.query("DELETE FROM dominio WHERE id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ deleted: id });
    }
  });
};

// Listar Domínios por Cliente
exports.dominio_cliente_idGET = function(req, res) {
  const id = req.params.id;
  mysql.query("SELECT * FROM dominio WHERE cliente_id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};
