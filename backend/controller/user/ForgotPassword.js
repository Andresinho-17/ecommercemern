const userModel = require("../../models/userModel");
const nodemailer = require("nodemailer");
const crypto = require('crypto');

async function ForgotPasswordController(req, res) {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "El correo electrónico es requerido.",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "No se encontró ningún usuario con este correo electrónico.",
      });
    }

    // Genera un token de restablecimiento de contraseña
    const token = crypto.randomBytes(20).toString('hex');

    // Establece la fecha de expiración del token a 1 hora a partir de ahora
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

    await user.save();

    // Configuración de nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tu_correo@gmail.com",
        pass: "tu_contraseña",
      },
    });

    const mailOptions = {
      from: "tu_correo@gmail.com",
      to: email,
      subject: "Recuperación de Contraseña",
      html: `<p>Hola ${user.name},</p>
             <p>Por favor haz clic en el siguiente enlace para recuperar tu contraseña:</p>
             <a href="http://tuapp.com/reset-password/${token}">Restablecer Contraseña</a>
             <p>Si no solicitaste este cambio, ignora este correo.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
        return res.status(500).json({
          error: true,
          success: false,
          message: "Hubo un problema al enviar el correo de recuperación.",
        });
      }
      console.log("Correo de recuperación enviado:", info.response);
      return res.status(200).json({
        error: false,
        success: true,
        message: `Se ha enviado un correo de recuperación a ${email}.`,
      });
    });

  } catch (err) {
    console.error("Error en el controlador de recuperación de contraseña:", err);
    return res.status(500).json({
      error: true,
      success: false,
      message: "Hubo un error en el controlador de recuperación de contraseña.",
    });
  }
}

module.exports = ForgotPasswordController;
