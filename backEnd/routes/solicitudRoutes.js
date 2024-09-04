const express = require('express');
const { createSolicitud, getSolicitudesByUser } = require('../controllers/solicitudController');
const router = express.Router();

router.post('/', createSolicitud);
router.get('/:userId', getSolicitudesByUser);

module.exports = router;
