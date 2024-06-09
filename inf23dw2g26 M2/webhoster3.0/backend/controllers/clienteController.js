'use strict';
const mysql = require("../utils/db.js");

/**
 * Gerenciamento de Clientes
 */

// Adicionar Cliente
exports.clientePOST = function(req, res) {
  const body = req.body;
  mysql.query(
    "INSERT INTO cliente (nome, tipo_de_conta, numero_fiscal, email, contacto, plano, periodicidade_de_pagamento, data_ultimo_pagamento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
    [body.nome, body.tipo_de_conta, body.numero_fiscal, body.email, body.contacto, body.plano, body.periodicidade_de_pagamento, body.data_ultimo_pagamento], 
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send({ id: result.insertId });
      }
    }
  );
};

// Listar Clientes
exports.clienteGET = function(req, res) {
  mysql.query("SELECT * FROM cliente", function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

// Consultar Cliente por ID
exports.cliente_idGET = function(req, res) {
  const id = req.params.id;
  mysql.query("SELECT * FROM cliente WHERE id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result[0]);
    }
  });
};

// Atualizar Cliente por ID
exports.cliente_idPUT = function(req, res) {
  const id = req.params.id;
  const body = req.body;
  mysql.query(
    "UPDATE cliente SET nome = COALESCE(?, nome), tipo_de_conta = COALESCE(?, tipo_de_conta), numero_fiscal = COALESCE(?, numero_fiscal), email = COALESCE(?, email), contacto = COALESCE(?, contacto), plano = COALESCE(?, plano), periodicidade_de_pagamento = COALESCE(?, periodicidade_de_pagamento), data_ultimo_pagamento = COALESCE(?, data_ultimo_pagamento) WHERE id = ?", 
    [body.nome, body.tipo_de_conta, body.numero_fiscal, body.email, body.contacto, body.plano, body.periodicidade_de_pagamento, body.data_ultimo_pagamento, id], 
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ id: id });
      }
    }
  );
};

// Deletar Cliente por ID
exports.cliente_idDELETE = function(req, res) {
  const id = req.params.id;
  mysql.query("DELETE FROM cliente WHERE id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ deleted: id });
    }
  });
};
'use strict';
const mysql = require("../utils/db.js");

/**
 * Gerenciamento de Clientes
 */

// Adicionar Cliente
exports.clientePOST = function(req, res) {
  const body = req.body;
  mysql.query(
    "INSERT INTO cliente (nome, tipo_de_conta, numero_fiscal, email, contacto, plano, periodicidade_de_pagamento, data_ultimo_pagamento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
    [body.nome, body.tipo_de_conta, body.numero_fiscal, body.email, body.contacto, body.plano, body.periodicidade_de_pagamento, body.data_ultimo_pagamento], 
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send({ id: result.insertId });
      }
    }
  );
};

// Listar Clientes
exports.clienteGET = function(req, res) {
  mysql.query("SELECT * FROM cliente", function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

// Consultar Cliente por ID
exports.cliente_idGET = function(req, res) {
  const id = req.params.id;
  mysql.query("SELECT * FROM cliente WHERE id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result[0]);
    }
  });
};

// Atualizar Cliente por ID
exports.cliente_idPUT = function(req, res) {
  const id = req.params.id;
  const body = req.body;
  mysql.query(
    "UPDATE cliente SET nome = COALESCE(?, nome), tipo_de_conta = COALESCE(?, tipo_de_conta), numero_fiscal = COALESCE(?, numero_fiscal), email = COALESCE(?, email), contacto = COALESCE(?, contacto), plano = COALESCE(?, plano), periodicidade_de_pagamento = COALESCE(?, periodicidade_de_pagamento), data_ultimo_pagamento = COALESCE(?, data_ultimo_pagamento) WHERE id = ?", 
    [body.nome, body.tipo_de_conta, body.numero_fiscal, body.email, body.contacto, body.plano, body.periodicidade_de_pagamento, body.data_ultimo_pagamento, id], 
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ id: id });
      }
    }
  );
};

// Deletar Cliente por ID
exports.cliente_idDELETE = function(req, res) {
  const id = req.params.id;
  mysql.query("DELETE FROM cliente WHERE id = ?", [id], function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ deleted: id });
    }
  });
};
