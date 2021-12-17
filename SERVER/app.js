const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionObject = {
    secret: 'Secret is always secret. Dont tell anyone.Because secret is secret.',
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionObject));
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client-side'));

const adminRoute = require('./routes/adminRoute');
const publicRoute = require('./routes/publicRoute');
const supplierRoute = require('./routes/supplierRoute');
const ahoRoute = require('./routes/ahoRoute');
const apiRoute = require('./routes/api');
const dmRoute = require('./routes/dmRoute');

app.use("/", publicRoute);
app.use("/admin", adminRoute);
app.use("/supplier", supplierRoute);
app.use("/aho", ahoRoute);
app.use("/api", apiRoute);
app.use("/dm", dmRoute);

app.listen(3004, console.log(`Crates Distribution server running on Port 3004...\n${new Date().toString()}`));