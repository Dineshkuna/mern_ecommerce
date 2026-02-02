import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth: { 
            user: "",
            pass: ""
        }
    })
    const mailOptions = {
        from: "",
        to: options.email,
        subject: options.subject,
        text: options.message
    }
 

}