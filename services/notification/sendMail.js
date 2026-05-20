const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NIBSS_EMAIL,
        pass: process.env.NIBSS_PASS,

    }
});

module.exports =
    async ({
        to,
        subject,
        message
           }) => {
        await transporter.sendMail({
            from: `"RAGNA BANK" <${process.env.EMAIL_USER}>`,

            to,

            subject,

            text:message

        })
}
