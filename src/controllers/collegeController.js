const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const validator = require("../validator/validator")
// const valid = require("validator")

// <----------------------------Post Api--------------------------------->
// ---------------This Api is used for Create College---------------------

const createCollege = async (req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "please provide data" })
        }
        const { name, fullName, logoLink } = data;
        if (!name) {
            return res.status(400).send({ status: false, message: "Name must contain" })
        }
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, message: "Please provide valid name !" })
        }
        const checkCollege = await collegeModel.findOne({ name: name.trim() })
        if (checkCollege) {
            return res.status(400).send({ status: false, msg: `college ${name} is already present` })
        }
        if (!fullName) {
            return res.status(400).send({ status: false, message: "please provide fullname" })
        }
        if (!validator.isValidName(fullName)) {
            return res.status(400).send({ status: false, message: "please Enter a valid fullname" })
        }
        if (!logoLink) {
            return res.status(400).send({ status: false, message: "LogoLink must contain" })
        }
        if (!validator.isValidUrl(logoLink)) {
            return res.status(400).send({ status: false, message: "please Enter a valid logolink." })
        }
        const result = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: { name: result.name, fullName: result.fullName, logoLink: result.logoLink, isDeleted: result.isDeleted } })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

// <----------------------------Get Api--------------------------------->
// ----------This Api is used for Get College Intern data----------------
const getCollegeData = async function (req, res) {
    try {
        const collegeName = req.query.collegeName
        if (!collegeName) return res.status(400).send({ status: false, message: "College Name is mandatory to find a intern" })
        const collegeData = await collegeModel.findOne({ name: collegeName.trim(), isDeleted: false }).select({ name: 1, fullName: 1, logoLink: 1, interns: 1 }).lean()
        if (!collegeData) {
            return res.status(404).send({ status: false, message: `college name ${collegeName} is not found` })
        }
        
        let internData = await internModel.find({ collegeId: collegeData._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })
        if (internData.length == 0) {

            collegeData.intern = internData
            return res.status(400).send({ data: collegeData, status: false, message: "No entern found" })
        }

        collegeData.intern = internData
        
        delete collegeData._id

        return res.status(200).send({ data: collegeData, status: true })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.createCollege = createCollege;
module.exports.getCollegeData = getCollegeData;



