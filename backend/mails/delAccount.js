const getDelAccountMail = (username) => {

  const mail = {
    subject: "😱 Account deleted !",
    html:
      `   
          <head>
          </head>
          <body>
            <main>
              <h1>Dear ${username},</h1>
              <h2>We are so sorry that you are leaving us !</h2>
              <p>Indeed, you just completely deleted your account.</p>
              <p>We are very concerned about the respect and security of your private data.<p/>
              <p>You can be sure that all informations about your account, including your photos, have been wiped from our database.</p>
              <p>For this reason, there is no recover possible... </p>
              <br>
              <p>When you want, feel free to sign up with a new account <a href='${global.domainName}/signup'>here</a>.</p>
              <p>We hope to see you there soon !</p>
              <p>Good bye ${username}, and thank you a lot for all your interest and contribution.</p>
              <br>
              <p style="color: red;">PS: If you did not made this request, DO NOT IGNORE this e-mail, as your password has probably been COMPROMISED.</p>
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

exports.getDelAccountMail = getDelAccountMail;