```javascript
const nodemailer = require('nodemailer');

const sendEmail = async (pollData, recipients) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: recipients,
        subject: 'New Poll: ' + pollData.question,
        html: generateEmailBody(pollData)
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}

const generateEmailBody = (pollData) => {
    let body = `<p>${pollData.question}</p>`;
    pollData.options.forEach((option, index) => {
        body += `<a href="${process.env.SERVER_URL}/responses/${pollData._id}/${index}">${option}</a><br>`;
    });
    return body;
}

module.exports = {
    sendEmail
}
```