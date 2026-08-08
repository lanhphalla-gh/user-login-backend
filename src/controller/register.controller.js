const registerService = require('../services/register.service');


exports.register = async(req,res)=>{

    try{

        const user =
            await registerService.register(req.body);


        res.json({
            message:"Register success",
            user
        });


    }catch(error){

        res.status(400).json({
            message:error.message
        });

    }

};