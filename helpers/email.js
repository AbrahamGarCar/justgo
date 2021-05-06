import { text } from 'body-parser';
import * as nodemailer from 'nodemailer';

export class GMailService  {
    
    constructor() {
        
    }

    sendMail(to, subject, content) {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'abrahamgc.cv@gmail.com',
                clientId: '1042578643338-36tkv6dolsv5gi1qhmaon7uvu212ek8o.apps.googleusercontent.com',
                clientSecret: 'NFQBGHAt8Zr3sdT9M6EfgrdD',
                refreshToken: '1//04XMpPHgduGPoCgYIARAAGAQSNwF-L9Irv3NvstZm00R8SYOuqqXIzX6OHCp1aAHIlW-qEHuP8-GK3UyIuD60IECkj8nzsB68RlA'
                // accessToken: 'ya29.a0AfH6SMCb-BliaGGLSZm92NGZzkNzrrt4VzcKfc2476l14JuAYirOuXCO7oyT6KJ1OXlsY0LUfSt6ijnrASl9HI2ReEXX7RIPA00M0uR1EBfRojIYwJwrkmoS6TKhMbUPAgjNFBWHPSYYJ4OCwamNdD5ZPhjoq3hB2QM',
                // user: 'ponernombreaqui@gmail.com',
            }
        });
    
        let mailOptions = {
            // from: "abrahamgc.cv@gmail.com",
            to: to,
            subject: subject,
            text: content
        }

        transporter.sendMail(mailOptions, (error, info) => {
            // console.log('Send email transporter');
            if (error) {
                 console.log(`Error: ${ error}`); 
            } else {
                console.log("Email enviado");
                console.log(info);
            }
        });
    }
}