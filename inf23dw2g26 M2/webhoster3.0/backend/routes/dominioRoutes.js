const express = require('express');
const router = express.Router();
const dominioController = require('../controllers/dominioController');

router.post('/', dominioController.dominioPOST);
router.get('/', dominioController.dominioGET);
router.get('/:id', dominioController.dominio_idGET);
router.put('/:id', dominioController.dominio_idPUT);
router.delete('/:id', dominioController.dominio_idDELETE);
router.get('/cliente/:id', dominioController.dominio_cliente_idGET);

module.exports = router;
