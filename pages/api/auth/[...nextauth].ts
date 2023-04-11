import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
// import { google } from 'googleapis'
// import nodemailer from 'nodemailer'
// import handlebars from 'handlebars'

import { checkUserEmailPassword, oAuthToDbUser } from '../../../database/dbUsers';
// import templateHtml from '../../../emails/welcome.html'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com' },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
      },
      async authorize(credentials) {
        console.log({ credentials })
        // return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };

        return await checkUserEmailPassword(credentials!.email, credentials!.password);
      }
    }),

    // FacebookProvider({
    //   clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    // }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // Custom Pages
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signin'
  },

  secret: process.env.AUTH_JWT_SECRET,

  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },

  // Callbacks
  callbacks: {

    async jwt({ token, account, user }) {
      // console.log({ token, account, user });
      // @ts-ignore 
      // await sendMail(user?.email)

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {

          case 'oauth':
            token.user = await oAuthToDbUser(user?.email || '', user?.name || '');
            break;

          case 'credentials':
            token.user = user;
            break;
        }

      }

      return token;
    },

    async session({ session, token, user }: any) {
      // console.log({ session, token, user });

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    }
  }
});

// const sendMail = async (email: string) => {

//   if (!email) return

//   const user = await getUser(email)

//   if (user) return

//   const CLIENT_ID = process.env.NEXT_PUBLIC_NODEMAILER_CLIENT_ID
//   const CLIENT_SECRET = process.env.NODEMAILER_CLIENT_SECRET
//   const REDIRECT_URI = process.env.NODEMAILER_REDIRECT_URL
//   const REFRESH_TOKEN = process.env.NODEMAILER_REFRESH_TOKEN

//   try {

//     const oAuth2Client = new google.auth.OAuth2(
//       CLIENT_ID,
//       CLIENT_SECRET,
//       REDIRECT_URI
//     );

//     oAuth2Client.setCredentials({
//       refresh_token: REFRESH_TOKEN
//     })

//     const template = handlebars.compile(templateHtml);
//     const replacements = {};
//     const htmlToSend = template(replacements);
//     const accessToken: any = await oAuth2Client.getAccessToken();

//     const transport = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user: 'aneuswimwearteam@gmail.com',
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });

//     const mailOptions = {
//       from: {
//         name: 'Aneu Swimwear',
//         address: 'aneuswimwearteam@gmail.com'
//       },
//       to: email,
//       subject: 'WELCOME ANEU GIRL 🤍',
//       html: htmlToSend
//     };

//     const response = await transport.sendMail(mailOptions);

//   } catch (error) {
//     console.log(error)
//   }

// };