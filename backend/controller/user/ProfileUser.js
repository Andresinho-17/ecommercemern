const userModel = require("../../models/userModel");

const funtion ProfileUserController (req,res){
    try{
        console.log("userId", req.userId)
        const user = await userModel.findById(req.userId)

        console.log("user",user)

        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "Detalles Usuario"
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success: false
        })
    }
}

