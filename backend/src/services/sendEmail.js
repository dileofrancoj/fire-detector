import nodemailer from "nodemailer";
// acceso a aplicaciones

export const send = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mail = {
      from: "dileo.francoj@gmail.com",
      to: ["dileo.francoj@gmail.com", "arielsilvainfo@gmail.com"],
      subject: "Alerta por INCENDIO",
      html: "Alerta por incendio. Niveles alto de CO",
    };
    const {messageId} = await transporter.sendMail(mail);
    return messageId;
    
  } catch (e) {
    throw e;
  }
};
