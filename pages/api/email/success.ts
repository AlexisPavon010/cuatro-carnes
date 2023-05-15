import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import handlebars from 'handlebars'

import templateHtml from '../../../emails/template.html'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case 'POST':
      return sendEmail(req, res);
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const sendEmail = async (req: NextApiRequest, res: NextApiResponse<any>) => {

  const { email } = req.body

  const CLIENT_ID = process.env.NEXT_PUBLIC_NODEMAILER_CLIENT_ID
  const CLIENT_SECRET = process.env.NODEMAILER_CLIENT_SECRET
  const REDIRECT_URI = process.env.NODEMAILER_REDIRECT_URL
  const REFRESH_TOKEN = process.env.NODEMAILER_REFRESH_TOKEN

  try {
    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );

    oAuth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN
    })

    const template = handlebars.compile(templateHtml);
    const replacements = {};
    const htmlToSend = template(replacements);
    const accessToken: any = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'themaster034@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'themaster034@gmail.com',
      to: email,
      subject: 'Hola, tu pedido en Cuatro carnes fue tomado con exito',
      html: htmlToSend,
    };

    const response = await transport.sendMail(mailOptions);

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error Request' })
  }
}