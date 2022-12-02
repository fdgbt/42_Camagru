const getContactMail = (username, email, subject, message) => {

  const mail = {
    subject: `🚨 [URGENT] ${subject}`,
    html:
      `   
          <head>
          </head>
          <body>
            <main>
              <h1>Ave, ${username} !</h1>
              <h2>The contact form has been filled by ${email} with the subject <span style="color: red;">${subject}</span>.</h2>
              <p>You can find below the message content:</p>
              <p><< ${message} >></p>
              <br>
              <p style="color: red;">PS: DO NOT IGNORE this e-mail, this is a special request from external user.</p>
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

exports.getContactMail = getContactMail;