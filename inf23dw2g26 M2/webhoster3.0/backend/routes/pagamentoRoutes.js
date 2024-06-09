const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

router.post('/', pagamentoController.pagamentoPOST);
router.get('/', pagamentoController.pagamentoGET);
router.get('/:id', pagamentoController.pagamento_idGET);
router.put('/:id', pagamentoController.pagamento_idPUT);
router.delete('/:id', pagamentoController.pagamento_idDELETE);
router.get('/cliente/:id', pagamentoController.pagamento_cliente_idGET);

module.exports = router;
