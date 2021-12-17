const express = require('express');
const router = express.Router();
const supplierDll = require('../BAL/adminBal');
module.exports = router;

router.post('/addSuplier', async (req, res) => {
    try {
            const result = await supplierDll.addSupplierDetails(req.body);
            res.send(result);
    } catch(e) {
        res.status(500).send(`Unexpected error.`);
    }
});
router.get('/getSupplierlist', async(req, res)=> {
    try{
        const result = await supplierDll.getSupplierlist();
        res.send(result);
    }
    catch(e)
    {
        res.status(500).send('Unexpected error')

    }
});
router.put('/updatesupplierDetail/:firmID', async(req, res)=> {
    try
    {
        const result = await supplierDll.updatesupplierDetail(req.params.firmID, req.body)
        res.send(result);
    }
    catch(e)
    {
        res.status(500).send('Unexpected error')
    }
   
});
router.delete("/deletesupplierData/:workOrderNo",async (req, res)=> {
    try{
        const result = await supplierDll.deletesupplierData(req.params)
        res.send(result);

    }
    catch(e)
    {
        res.status(500).send('Unexpected error')
       
    }
   
});
router.get('/districtList',async(req, res) => {
    try
    {
        const result = await supplierDll.getDistrictList()
        res.send(result);
    }
    catch(e)
    {
        res.status(500).send('Unexpected error')

    }
 
});
router.get('/blockList/:district_id',async(req, res)=> {
    try
    {
        const result = await supplierDll.getBlockList(req.params.district_id)
        res.send(result);
    }
    catch(e)
    {
        res.status(500).send('Unexpected error')

    }
   
});
router.post('/addsupply',async(req, res)=> {
    try
    {
        const result = await supplierDll.supply(req.body)
        res.send(result);
}
catch(e)
{
    res.status(500).send('Unexpected error')
                    
}
   
});
router.get('/getSupplylist',async (req, res)=> {
    try
    {
        const result = await supplierDll.getSupplylist()
        res.send(result);
    }
    catch(e)
    {
    res.status(500).send('Unexpected error')
    }
  
});
router.get('/getFinYearDistWiseReceivedCrateList/:districtCode', async (req, res) => {
    try {
        const result = await supplierDll.getFinYearDistWiseReceivedCrateList(req.params, req.query);
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.get('/confirmReceivedCrates/:districtCode/:lotNo/:blockCode', async (req, res) => {
    try {
        const result = await supplierDll.confirmReceivedCrates(req.params);
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.get('/getSupplierDetails/:supplierId', async (req, res) => {
    try {
        const result = await supplierDll.getSupplierDetails(req.params);
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});
router.put('/updateSupplierDetails/:supplierId', async (req, res) => {
    try {
            const result = await supplierDll.updateSupplierDetails(req.params, req.body);
            res.send(result);
    } catch(e) {
        res.status(500).send(`Unexpected error.`);
    }
});
router.get('/checkWONoDuplicate/:woNo', async (req, res) => {
    try {
        const result = await supplierDll.checkWONoDuplicate(req.params);
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});