const router = require('express').Router();
module.exports = router;
const path = require('path');
const jwt = require('jsonwebtoken');
const sha256 = require('sha256');
const crypto = require('crypto');
const format = require('biguint-format');
var requestIP = require('request-ip');
var UAParser = require('ua-parser-js');
var parser = new UAParser();
const publicBal = require('../BAL/publicBal');
// const auditTrailBal = require('../BAL/auditLogBal');
router.post('/login', async (req, res) => {
    try {
        const userDetails = await publicBal.getUserDetail(req.body.userId);
        if(userDetails) {
            if(req.body.password === sha256(userDetails.password)) {
            // if(req.body.password === sha256(sha256(userDetails.password) + req.session.saltValue)) {
                let userId = userDetails.userId;
                if(userDetails.role === 'SUPPLIER') {
                    userId = userDetails.workOrderNo;
                }
                const token = jwt.sign({ userId: userDetails.userId, role: userDetails.role }, 'jsonwebtokensecretisalwaysasecret', { expiresIn: 60 * 60 * 5 });
                req.session.userId = req.body.userId;
                req.session.userRole = userDetails.role;
                res.cookie('token', token)
                .cookie('userName', userDetails.userName)
                .cookie('userId', userId)
                .cookie('userCode', userDetails.userCode)
                .cookie('role', userDetails.role)
                .cookie('districtCode', userDetails.districtCode)
                .sendFile(path.join(__dirname, '../client-side/index.html'));
                // auditTrailBal.Log(req.body.userName, userDetails.role, 'login', 'success', 'Successfully logged in', req.url, `/login`, requestIP.getClientIp(req), parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version.split(".", 1).toString());
            } else {
                res.status(401).send(`<h1 style='text-align:center;color:red'>Wrong credential<br> <a href='home.html'>Try again</a> </h1>`);
                // auditTrailBal.Log(req.body.userName, userDetails.role, 'login', 'failed', 'Password mismatch', req.url, '/login', requestIP.getClientIp(req), parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version.split(".", 1).toString());
            }
        } else {
            res.status(401).send(`<h1 style='text-align:center;color:red'>Wrong credential.<br> <a href='home.html'>Try again</a> </h1>`);
            // auditTrailBal.Log('unknown', 'unknown', 'login', 'failed', 'User detail not found', req.url, '/login', requestIP.getClientIp(req), parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version.split(".", 1).toString());
        }
    } catch(e) {
        console.error(e);
        res.status(500).send(`Network issue.`);
    }
});
function randomC(qty) {
    var x = crypto.randomBytes(qty);
    return format(x, 'dec');
}
function random(low, high) {
    return randomC(4) / Math.pow(2, 4 * 8 - 1) * (high - low) + low;
}
router.post('/changePassword', async (req, res) => {
    try{
        const result = await publicBal.changePassword(req.body);
        res.send(result);
    } catch(e) {
        console.error(e);
        res.status(500).send('Unexpected issue. Try again');
    }
})

router.get('/getDistrictList',async(req, res) => {
    try {
        const result = await publicBal.getDistrictList()
        res.send(result);
    }
    catch(e)
    {
        res.status(500).send('Unexpected error')

    }
});
router.get('/getBlockList/:districtCode',async(req, res)=> {
    try {
        const result = await publicBal.getBlockList(req.params)
        res.send(result);
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Unexpected error');
    }
});