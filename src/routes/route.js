const express = require('express');
const router = express.Router();
const internController= require ("../controllers/internController.js")
const collegeController= require ("../controllers/collegeController.js")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/functionup/colleges",collegeController.createCollege)

router.post("/functionup/interns",internController.createInterns)

router.get("/functionup/collegeDetails",collegeController.getCollegeData)

router.all("/*", (req, res) =>{
    res.status(404).send({ msg: "invalid http request" })
});

module.exports = router;    