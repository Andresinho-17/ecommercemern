const userModel = require("../../models/userModel")


async function updateUser(req,res){
    try{

        const sessionUser = req.userId

        const { userId, name, email, role } = req.body

        const payload = {
            ...(name && {name: name}),
            ...(email && {email: email}),
            ...(role && {role: role}),
        }

        const user = await userModel.findById(sessionUser)

        const updateUser = await userModel.findByIdAndUpdate(userId,payload)

        console.log ("rol de usuario", user.role)

        res.json({
            data : updateUser,
            message : "usuario actualizado",
            success : true,
            error : false
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success: false
        })
    }
}

module.exports = updateUser