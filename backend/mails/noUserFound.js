const getNoUserFoundMail = (email) => {

  const mail = {
    subject: "🤭 Have we already met before ?",
    html:
      `   
          <head>
          </head>
          <body>
            <main>
              <h1>Hello mysterious guest, we are annoyed that you have difficulties to login !</h1>
              <h2>Indeed, you asked to reset your password with this address: ${email}.
              <h2>However we could not find your e-mail in our database...</h2>
              <p>Maybe you signed up with another e-mail address ?</p>
              <p>Otherwise, feel free to sign up with a new account <a href='${global.domainName}/signup'>here</a> !</p>
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

exports.getNoUserFoundMail = getNoUserFoundMail;