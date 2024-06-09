const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/', clienteController.clientePOST);
router.get('/', clienteController.clienteGET);
router.get('/:id', clienteController.cliente_idGET);
router.put('/:id', clienteController.cliente_idPUT);
router.delete('/:id', clienteController.cliente_idDELETE);

module.exports = router;
