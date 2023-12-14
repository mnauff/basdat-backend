import nodemailer from 'nodemailer'

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_EMAIL_ADDRESS,
                pass: process.env.GMAIL_PASSWORD,
            },
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        })
    } catch (error) {
        console.log(error, 'email not sent')
    }
}
