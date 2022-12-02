const getNewPwdMail = (username) => {

  const mail = {
    subject: "✅ Password changed !",
    html:
      `   
          <head>
          </head>
          <body>
            <main>
              <h1>Hello again ${username} !</h1>
              <h2>You just have edited successfully your password !</h2>
              <p>You can now come back to us and start <a href='${global.domainName}/editing'>shooting photos</a>.</p>
              <p>If not authenticated yet, you can <a href='${global.domainName}/login'>login</a> with your new password.<p/>
              <p>See you there !</p>
              <br>
              <p style="color: red;">PS: If you did not made this request, DO NOT IGNORE this e-mail, as your mail address has probably been COMPROMISED.</p>
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

exports.getNewPwdMail = getNewPwdMail;