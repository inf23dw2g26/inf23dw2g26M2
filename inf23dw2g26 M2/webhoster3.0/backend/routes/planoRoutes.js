const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');

router.post('/', planoController.planoPOST);
router.get('/', planoController.planoGET);
router.get('/:id', planoController.plano_idGET);
router.put('/:id', planoController.plano_idPUT);
router.delete('/:id', planoController.plano_idDELETE);
router.get('/cliente/:id/plano', planoController.cliente_planoGET);

module.exports = router;
