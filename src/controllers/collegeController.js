// const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const validator = require("../validator/validator")
// const valid = require("validator")

// <----------------------------Post Api--------------------------------->
// ---------------This Api is used for Create College---------------------

const createCollege = async (req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length == 0){
            return res
                .status(400)//bad request
                .send({ status: false, message: "please provide data" })
        }
        const { name, fullName, logoLink } = data;
        if (!name) {
            return res.status(400).send({ status: false, message: "Name must contain" })
        }
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, message: "Please provide valid name !" })
        }
        const checkCollege = await collegeModel.findOne({ name: name.trim().toUpperCase() })
        if (checkCollege) {
            return res.status(400).send({ status: false, msg: `college ${name} is already present` })
        }
        if (!fullName) {
            return res.status(400).send({ status: false, message: "please provide fullname" })
        }
        if (!validator.isValidCharacterLimit2to100(fullName)) {
            return res.status(400).send({ status: false, message: "please Enter a valid fullname" })
        }
        const checkFullname = await collegeModel.findOne({ fullName: fullName.trim().toLowerCase() })
        if (checkFullname) {
            return res.status(400).send({ status: false, msg: `college ${fullName} is already present` })
        }
        if (!logoLink) {
            return res.status(400).send({ status: false, message: "LogoLink must contain" })
        }
        if (!validator.isValidUrl(logoLink)) {
            return res.status(400).send({ status: false, message: "please Enter a valid logolink." })
        }
        const checkLink = await collegeModel.findOne({ logoLink: logoLink.trim() })
        if (checkLink) {
            return res.status(400).send({ status: false, msg: `college ${logoLink} is already present` })
        }
        const result = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: { name: result.name, fullName: result.fullName, logoLink: result.logoLink, isDeleted: result.isDeleted } })
    }catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

// <----------------------------Get Api--------------------------------->
// ----------This Api is used for Get College Intern data----------------




module.exports.createCollege = createCollege;
