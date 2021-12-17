const express = require('express');
const router = express.Router();
const ahoBal = require('../BAL/ahoBal');
module.exports = router;

router.get('/getFinYearWiseWorkOrderList/:userCode', async (req, res) => {
    try {
        const result = await ahoBal.getFinYearWiseWorkOrderList(req.params, req.query);
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.get('/getFinYearWiseLotList/:userCode', async (req, res) => {
    try {
        const result = await ahoBal.getFinYearWiseLotList(req.params, req.query)
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.get('/getFinYearWiseReceivedCrateList/:userCode', async (req, res) => {
    try {
        const result = await ahoBal.getFinYearWiseReceivedCrateList(req.params, req.query)
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.put('/receiveCreatesFromLot/:lotNo/:userCode', async (req, res) => {
    try {
        const result = await ahoBal.receiveCreatesFromLot(req.params, req.body)
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.get('/getWOWiseQuantityDetail/:userCode/:woNo', async (req, res) => {
    try {
        const result = await ahoBal.getWOWiseQuantityDetail(req.params)
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.get('/getWSHGList', async (req, res) => {
    try {
        const result = await ahoBal.getWSHGList();
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.get('/getPreDistNameOfFarmerID/:districtCode', async (req, res) => {
    try {
        const result = await ahoBal.getPreDistNameOfFarmerID(req.params);
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.post('/addCrateDistributionDetail/', async (req, res) => {
    try {
        const result = await ahoBal.addCrateDistributionDetail(req.body);
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.get('/getDistributedCrateList', async (req, res) => {
    try {
        const result = await ahoBal.getDistributedCrateList(req.query);
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.get('/farmerIsReceiveCrate', async (req, res) => {
    try {
        const result = await ahoBal.farmerIsReceiveCrate(req.query);
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});


