const express = require('express');
const { createHistorial, getHistorialBySolicitud } = require('../controllers/historialController');
const router = express.Router();

router.post('/', createHistorial);
router.get('/:solicitudId', getHistorialBySolicitud);

module.exports = router;
