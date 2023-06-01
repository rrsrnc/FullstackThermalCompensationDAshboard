const express = require('express')
const {getdata, getdownload, feeddata, postdata} = require('../controller/datacontroller.js')
const router = express.Router();

router.route('/s').get(getdata).post(feeddata,postdata);
router.route('/download').get(getdownload);

module.exports = router;