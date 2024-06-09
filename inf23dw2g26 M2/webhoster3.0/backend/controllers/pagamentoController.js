'use strict';
const mysql = require("../utils/db.js");

/**
 * Gerenciamento de Pagamentos
 */

// Adicionar Pagamento
exports.pagamentoPOST = function(req, res) {
  const body = req.body;
  mysql.query(
    "INSERT INTO pagamento (cliente_id, valor, data_pagamento, metodo_pagamento) VALUES (?, ?, ?, ?)", 
    [body.cliente_id, body.valor, body.data_pagamento, body.metodo_pagamento], 
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send({ id: result.insertId });
      }
    }
  );
};

// Listar Pagamentos
exports.pagamentoGET = function(req, res) {
  mysql.query("SELECT * FROM pagamento", function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

// Consultar Pagamento por ID
exports.pagamento_idGET = function(req, res) {
  const id = req.params.id;
  mysql.query("SELECT * FROM pagamento WHERE id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result[0]);
    }
  });
};

// Atualizar Pagamento por ID
exports.pagamento_idPUT = function(req, res) {
  const id = req.params.id;
  const body = req.body;
  mysql.query(
    "UPDATE pagamento SET cliente_id = COALESCE(?, cliente_id), valor = COALESCE(?, valor), data_pagamento = COALESCE(?, data_pagamento), metodo_pagamento = COALESCE(?, metodo_pagamento) WHERE id = ?", 
    [body.cliente_id, body.valor, body.data_pagamento, body.metodo_pagamento, id], 
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ id: id });
      }
    }
  );
};

// Deletar Pagamento por ID
exports.pagamento_idDELETE = function(req, res) {
  const id = req.params.id;
  mysql.query("DELETE FROM pagamento WHERE id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ deleted: id });
    }
  });
};

// Listar Pagamentos por Cliente
exports.pagamento_cliente_idGET = function(req, res) {
  const id = req.params.id;
  mysql.query("SELECT * FROM pagamento WHERE cliente_id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};
