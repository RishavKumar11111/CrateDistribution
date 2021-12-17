const express = require('express');
const router = express.Router();
module.exports = router;
const supplierBal = require('../BAL/supplierBal');


router.post('/addSupply',async(req, res)=> {
    try {
            const result = await supplierBal.addSupply(req.body)
            res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');           
    }   
});
router.put('/updateAreaOfSupply/:lotNo',async(req, res)=> {
    try {
        const result = await supplierBal.updateAreaOfSupply(req.params, req.body)
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');           
    }   
});
router.get('/getAvailableCrateQuantityOfWO/:workOrderNo', async (req, res)=> {
    try {
        const result = await supplierBal.getAvailableCrateQuantityOfWO(req.params)
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');           
    }   
});
router.get('/getSupplyList',async (req, res)=> {
    try {
        const result = await supplierBal.getSupplyList()
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error')
    }
});
router.get('/getSupplierDetailsByWONo/:woNo',async (req, res)=> {
    try {
        const result = await supplierBal.getSupplierDetailsByWONo(req.params);
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error')
    }
});
