var router = require('express').Router();
module.exports = router;


router.get('/getFinYear', function (req, res) {
  var year = new Date().getFullYear().toString();
  var month = new Date().getMonth();
  var finYear = month >= 3 ? year + "-" + (parseInt(year.slice(2, 4)) + 1).toString() : (parseInt(year) - 1).toString() + "-" + year.slice(2, 4);
  let Years = [];
  Years.push(finYear);
  for (let i = 1; i < 1; i++) {
    Years.push((parseInt(finYear.slice(0, 4)) - i) + '-' + (parseInt(finYear.slice(5, 7)) - i));
  }
  res.send(Years);
});