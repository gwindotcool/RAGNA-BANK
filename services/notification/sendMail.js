const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NIBSS_EMAIL,
        pass: process.env.NIBSS_PASS
    }
});

module.exports = async ({
                            to,
                            subject,
                            message,
                            title = "RAGNA BANK",
                            type = "info" // success | debit | credit | warning
                        }) => {

    const colors = {
        success: "#16a34a",
        debit: "#dc2626",
        credit: "#2563eb",
        warning: "#f59e0b",
        info: "#4f46e5"
    };

    const accentColor = colors[type] || colors.info;

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>

    <body style="
        margin:0;
        padding:0;
        background:#f4f7fb;
        font-family:Arial, Helvetica, sans-serif;
    ">

        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding:40px 20px;">

                    <table width="600" cellpadding="0" cellspacing="0" style="
                        background:#ffffff;
                        border-radius:20px;
                        overflow:hidden;
                        box-shadow:0 4px 20px rgba(0,0,0,0.08);
                    ">

                        <!-- HEADER -->
                        <tr>
                            <td style="
                                background:${accentColor};
                                padding:30px;
                                text-align:center;
                                color:white;
                            ">
                                <h1 style="
                                    margin:0;
                                    font-size:28px;
                                    letter-spacing:1px;
                                ">
                                    RAGNA BANK
                                </h1>

                                <p style="
                                    margin-top:10px;
                                    font-size:15px;
                                    opacity:0.9;
                                ">
                                    Secure Banking Experience
                                </p>
                            </td>
                        </tr>

                        <!-- CONTENT -->
                        <tr>
                            <td style="padding:40px 35px;">

                                <h2 style="
                                    margin-top:0;
                                    color:#111827;
                                    font-size:24px;
                                ">
                                    ${title}
                                </h2>

                                <div style="
                                    color:#374151;
                                    line-height:1.8;
                                    font-size:16px;
                                    white-space: pre-line;
                                ">
                                    ${message}
                                </div>

                                <div style="
                                    margin-top:30px;
                                    padding:20px;
                                    background:#f9fafb;
                                    border-radius:12px;
                                    border-left:5px solid ${accentColor};
                                ">
                                    <strong>Security Notice:</strong>
                                    Never share your password, OTP,
                                    or PIN with anyone.
                                </div>

                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td style="
                                background:#111827;
                                color:#d1d5db;
                                text-align:center;
                                padding:25px;
                                font-size:14px;
                            ">
                                <p style="margin:0;">
                                    © 2026 RAGNA BANK
                                </p>

                                <p style="
                                    margin-top:10px;
                                    font-size:12px;
                                    color:#9ca3af;
                                ">
                                    This is an automated banking notification.
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
        html: htmlTemplate
    });
};