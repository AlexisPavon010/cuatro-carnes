import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import formidable from "formidable";
import { readFileSync } from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
};

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

const parseFile = (req: NextApiRequest) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err)
      }
      const { email, uniqueID } = fields;
      resolve({ files, email, uniqueID })
    })
  })
}

const sendEmail = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_NODEMAILER_CLIENT_ID
  const CLIENT_SECRET = process.env.NODEMAILER_CLIENT_SECRET
  const REDIRECT_URI = process.env.NODEMAILER_REDIRECT_URL
  const REFRESH_TOKEN = process.env.NODEMAILER_REFRESH_TOKEN

  try {
    const { files, email, uniqueID = '00000' }: any = await parseFile(req);
    const file = files.file;
    const fileContent = readFileSync(file.filepath);

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );

    oAuth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN
    })
    const accessToken: any = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'frigorifico4carnes@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: {
        name: 'Ventas Cuatro Carnes',
        address: 'ventas@cuatrocarnes.com'
      },
      to: email,
      subject: `Aqui esta la factura del pedido #${uniqueID}`,
      attachments: [
        {
          filename: file.originalFilename,
          content: fileContent
        }
      ]
    };

    const response = await transport.sendMail(mailOptions);

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error Request' })
  }
}