const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');

async function userSignUpController(req,res){
    try{
        const { email, password, name} = req.body

        const user= await userModel.findOne({email})

        console.log("user",user)

        if(user){
            throw new Error("Ya ha salido el usuario")
        }

        if(!email){
           throw new Error("Indique su correo")
        }
        if(!password){
            throw new Error("Indique su contraseña")
        }
        if(!name){
            throw new Error("Indique su nombre")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Algo va mal")
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "¡Usuario creado con éxito!"
        })

    }catch(err){
        res.json({
            menssage : err.menssage || err,
            error: true,
            sucess : false,
        })
    }
}

module.exports = userSignUpController