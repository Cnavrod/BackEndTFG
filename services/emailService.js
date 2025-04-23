import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, // smtp.gmail.com
  port: process.env.MAIL_PORT, // 465
  secure: true, // true para conexiones SSL/TLS
  auth: {
    user: process.env.EMAIL_USER, // tu_correo@gmail.com
    pass: process.env.EMAIL_PASS, // contraseña de aplicación generada
  },
});

export const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: `"Newsletter" <${process.env.EMAIL_USER}>`, // Nombre opcional
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
