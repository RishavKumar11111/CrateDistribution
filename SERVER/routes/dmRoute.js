const express = require('express');
const router = express.Router();
const dmBal = require('../BAL/dmBal');
module.exports = router;

router.get('/getFinYearDistWiseReceivedCrateList/:districtCode', async (req, res) => {
    try {
        const result = await dmBal.getFinYearDistWiseReceivedCrateList(req.params, req.query);
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.get('/confirmReceivedCrates/:districtCode/:lotNo/:blockCode', async (req, res) => {
    try {
        const result = await dmBal.confirmReceivedCrates(req.params);
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});