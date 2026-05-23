const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NIBSS_EMAIL,
        pass: process.env.NIBSS_PASS,
    },
});

module.exports = async ({
                            to,
                            subject,
                            message,
                            customerName = "Customer",
                            type = "notification" // debit | credit | notification
                        }) => {

    const isDebit = type === "debit";
    const isCredit = type === "credit";

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>

    <body style="margin:0; padding:0; background:#f4f6f9; font-family:Arial, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9; padding:40px 0;">
            <tr>
                <td align="center">

                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.08);">

                        <!-- Header -->
                        <tr>
                            <td style="background:#111827; padding:30px; text-align:center;">
                                <h1 style="color:#ffffff; margin:0; font-size:28px;">
                                    RAGNA BANK
                                </h1>
                                <p style="color:#cbd5e1; margin-top:8px;">
                                    Secure Banking Notification
                                </p>
                            </td>
                        </tr>

                        <!-- Alert Banner -->
                        <tr>
                            <td style="padding:30px;">

                                <div style="
                                    background:${isDebit ? "#FEF2F2" : isCredit ? "#ECFDF5" : "#EFF6FF"};
                                    border-left:5px solid ${isDebit ? "#DC2626" : isCredit ? "#16A34A" : "#2563EB"};
                                    padding:20px;
                                    border-radius:8px;
                                ">

                                    <h2 style="
                                        margin:0;
                                        color:${isDebit ? "#B91C1C" : isCredit ? "#15803D" : "#1D4ED8"};
                                    ">
                                        ${subject}
                                    </h2>

                                    <p style="margin-top:10px; color:#374151; line-height:1.7;">
                                        Hello <strong>${customerName}</strong>,
                                    </p>

                                    <div style="
                                        background:white;
                                        padding:20px;
                                        border-radius:8px;
                                        border:1px solid #e5e7eb;
                                        margin-top:20px;
                                        line-height:1.8;
                                        color:#374151;
                                    ">
                                        ${message.replace(/\n/g, "<br>")}
                                    </div>

                                </div>

                            </td>
                        </tr>

                        <!-- Security Notice -->
                        <tr>
                            <td style="padding:0 30px 30px;">
                                <div style="
                                    background:#F9FAFB;
                                    border:1px solid #E5E7EB;
                                    border-radius:8px;
                                    padding:20px;
                                ">
                                    <strong style="color:#111827;">
                                        Security Notice
                                    </strong>

                                    <p style="
                                        color:#6B7280;
                                        font-size:14px;
                                        line-height:1.7;
                                    ">
                                        Please do not share your OTP, password,
                                        or banking credentials with anyone.
                                        RAGNA BANK will never request sensitive
                                        information through email.
                                    </p>
                                </div>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="
                                background:#111827;
                                padding:30px;
                                text-align:center;
                            ">
                                <p style="color:#D1D5DB; margin:0;">
                                    © 2026 RAGNA BANK
                                </p>

                                <p style="
                                    color:#9CA3AF;
                                    font-size:13px;
                                    margin-top:10px;
                                ">
                                    This is an automated message.
                                    Please do not reply to this email.
                                </p>
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    `;

    await transporter.sendMail({
        from: `"RAGNA BANK" <${process.env.NIBSS_EMAIL}>`,
        to,
        subject,
        text: message,
        html: htmlTemplate,
    });
};