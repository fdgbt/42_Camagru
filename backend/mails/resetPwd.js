const getResetPwdMail = (username, token) => {

  const mail = {
    subject: "🤔 Lost your password ?",
    html:
      `   
          <head>
          </head>
          <body>
            <main>
              <h1>Hello ${username}, we are annoyed that you have difficulties to login !</h1>
              <h2>Please, click to <a href='${global.domainName}/login/reset/${token}'>this link</a> to set a new password.</h2>
              <p>For your safety, the link above will expire in <b>10 minutes</b>.</p>
              <p>See you there !</p>
              <br>
              <p>PS: If you did not made this request, you can ignore this e-mail.</p>
              <table>
                <tbody>
                  <tr>
                    <td><img src="https://i.ibb.co/341KX0r/camagru-ico.png" /></td>
                    <td><img src="https://i.ibb.co/RvzM7VD/camagru-transparent.png" /></td>
                  </tr>
                </tbody>
              </table>
              <p>Author: Fdagbert</p>
              <p>Organization: 42 - Paris</p>
              <p>Any problem ? Ask for help <a href='${global.domainName}/contact'>here</a> !</p>
            </main>
          </body>
        `
  };

  return mail;
}

exports.getResetPwdMail = getResetPwdMail;