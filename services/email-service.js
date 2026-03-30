require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Spotify Music" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegistrationEmail(userEmail, name){
  const upperName = name.toUpperCase();
  const subject = "🎵 Your Music Journey Awaits 🎶";
  
  const text = `
🎉 Hello ${upperName} 👋

Welcome to **Spotify Music**, your personal music streaming platform! Your account is now active and ready to use.

━━━━━━━━━━━━━━━━━━━━━━━
✨ What you can do next:
━━━━━━━━━━━━━━━━━━━━━━━

🔐 Log in and set up your profile  
🎶 Upload your favorite music tracks  
💿 Create and manage albums  
⚡ Explore and stream songs  

━━━━━━━━━━━━━━━━━━━━━━━

Your music journey starts here. Let’s make every beat count! 🎧

🚀 Start Listening Now:
https://spotify.com/login

━━━━━━━━━━━━━━━━━━━━━━━

💬 Need Help?
Our support team is here for you anytime.

Welcome aboard! Enjoy your musical experience.

Warm regards,  
**Spotify Team** 🎼

━━━━━━━━━━━━━━━━━━━━━━━

📩 Support: support@spotify.com  
🔒 If you did not create this account, please contact us immediately.

© 2026 Spotify — All Rights Reserved.
`;

  const html = `
<div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
  <table align="center" width="100%" style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <tr>
         <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:30px;text-align:center;color:#fff;">
          <h1 style="margin:0;font-size:24px;">🎉 Welcome to SPOTIFY MUSIC</h1>
          <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">Let’s Get Started!</p>
        </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:30px;">
        <h2 style="color:#333;margin-top:0;">Hello ${upperName} 👋</h2>

        <p style="color:#555;font-size:15px;line-height:1.6;">
          We’re excited to have you join <strong>Spotify Music</strong>! 🎶<br/>
          Your account is now active and ready to explore music your way.
        </p>

        <!-- Features -->
        <div style="margin:20px 0;">
          <p style="margin:10px 0;font-size:14px;">🔐 Log in and set up your profile</p>
          <p style="margin:10px 0;font-size:14px;">🎶 Upload your favorite tracks</p>
          <p style="margin:10px 0;font-size:14px;">💿 Create and manage albums</p>
          <p style="margin:10px 0;font-size:14px;">⚡ Explore and stream songs</p>
        </div>

        <p style="color:#555;font-size:15px;line-height:1.6;">
          Let the music play! Your personalized experience starts now. 🎧
        </p>

        <!-- Button -->
        <div style="text-align:center;margin:30px 0;">
          <a href="https://spotify.com/login" 
             style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:bold;">
            🚀 Start Listening
          </a>
        </div>

        <!-- Help -->
        <p style="color:#555;font-size:14px;">
          💬 <strong>Need Help?</strong><br/>
          Our support team is always available for you.
        </p>

        <p style="margin-top:20px;color:#333;font-weight:bold;">
          Warm regards,<br/>
          The Spotify Music Team 🎼
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#888;">
        📩 Support: support@spotify.com<br/><br/>
        🔒 If you did not create this account, please contact us immediately.<br/><br/>
        © 2026 Spotify — All Rights Reserved.
      </td>
    </tr>

  </table>
</div>
`;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {sendRegistrationEmail};