import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: 'izzatgamer49@gmail.com',
    subject: 'Najot',
    text: otp,
  });
};
