
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'khitem.mathlouthi@esprit.tn',
		  pass: 'perkwwhguscfwjtu'
  }
});

exports.sendMailResetPassword = (email, password) => {
  console.log("testLogin", email);

  // Créez le contenu HTML de l'e-mail avec des styles CSS
  const htmlContent = `
    <html>
      <head>
        <style>
          /* Ajoutez ici vos styles CSS personnalisés */
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #007bff;
          }
          .welcome-image {
            max-width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to klitchy!</h1>
          
          <img src="file:///Users/khitemmathlouthi/Desktop/Klitchy_Back-main/app/services/tets.html" alt="klitchy Logo" class="welcome-image">
          <p>Here is the validation code to reset your password: <strong>${password}</strong></p>
          <p>Click the following link to reset your password:</p>
          <a href="https://yourwebsite.com/reset-password">Reset Password</a>
        </div>
      </body>
    </html>
  `;

  var mailOptions = {
    to: email,
    from: 'khitem.mathlouthi@esprit.tn',
    subject: 'Reset Your Password - Klitchy',
    html: htmlContent, // Utilisez le contenu HTML ici
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

