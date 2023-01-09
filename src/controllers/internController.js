const collegeModel = require("../models/collegeModel.js");
const internModel = require("../models/internModel.js");
const validator = require("../validator/validator.js");



const createInterns = async function (req, res) {
    try {
    if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ status: false, message: "no content in the document, please provide intern details" })
        }
        else {
            const{ name, email, mobile, collegeName } = req.body
            if (name && email && mobile && collegeName) {
                if (!(validator.isValidCharacterLimit2to100(name) && validator.isValid(name))) {
                    return res.status(400).send({ status: false, message: "please provide your valid name" })
                }
                if (!(validator.isValidEmail(email) && validator.isValid(email))) {
                    return res.status(400).send({ status: false, message: "please provide your valid email" })
                }

            const checkEmail = await internModel.findOne({ email: email.trim().toLowerCase() })
                if (checkEmail) {
                    return res.status(400).send({ status: false, message: `This email: ${email.trim()} is already in used for intern`})
                }
                    
                if (!(validator.isValidNumber(mobile) && validator.isValid(mobile))) {
                    return res.status(400).send({ status: false, message: "please provide your valid Number with 91, Number size should be of 10" })
                }     
            
            const checkMobile = await internModel.findOne({ mobile: mobile})
                if (checkMobile) {
                    return res.status(400).send({ status: false, message: `This number: ${mobile} is already in used for intern` })
                } 



       if (!(validator.isValidCharacterLimit2to8(collegeName)&& validator.isValid(collegeName))){            
          return res.status(400).send({ status: false, message: "please provide your valid college Name"})}                   

                    
            const checkCollege = await collegeModel.findOne({ name: collegeName.trim().toUpperCase()})              
                if (checkCollege){

            const createIntern = await internModel.create({ name: name.trim(), email: email.trim().toLowerCase(), mobile: mobile, collegeId: checkCollege._id})
               return res.status(201).send({ status: true, data: createIntern })
            }       
            else {
                return res.status(404).send({ status: false, message: "college is not present" })
                }        
            }
            else {
                return res.status(400).send({ status: false, message: "please enter name, email, mobile and collegeName" })
            }
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




module.exports.createInterns=createInterns