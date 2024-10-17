// routes/api.js
const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulationController');

router.post('/start', simulationController.startSimulation);
router.get('/stop', simulationController.stopSimulation);
router.get('/data', simulationController.getSimulationData);
router.post('/parameters', simulationController.updateParameters);

module.exports = router;
