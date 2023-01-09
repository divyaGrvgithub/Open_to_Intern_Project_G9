const express = require('express');
const router = express.Router();
const internController= require ("../controllers/internController.js")
const collegeController= require ("../controllers/internController.js")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/functionup/interns",internController.createInterns)


module.exports = router;    