const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

// <----------------------------Post Api--------------------------------->
// ---------------This Api is used for Create College---------------------

module.exports.createCollege = async (req,res) =>{
    try{
        let data = req.body;

        if(Object.keys(data).length==0){
            return res
            .status(400)//bad request
            .send({status:false, message: "please provide data"})
        }

        const{ name, fullName, logoLink }=data;
        
        if(!name){
            return res
            .status(400)
            .send({status:false, message: "please provide valid name"})
        }
        const validName = (/)
        
    }
}