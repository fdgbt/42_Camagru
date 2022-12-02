const getNewComMail = (username, title, writer, picId) => {

  const mail = {
    subject: "😁 You received a new comment !",
    html:
      `   
          <head>
          </head>
          <body>
            <main>
              <h1>Great news, ${username} !</h1>
              <h2>Your photo "${title}" just have been commented by ${writer} !</h2>
              <p>You can click <a href='${global.domainName}/gallery/${picId}'>here</a> to see it now.</p>
              <p>See you there !</p>
              <br>
              <p>PS: You can choose to stop receiving this mail in your <a href='${global.domainName}/settings'>account settings</a>.</p>
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

exports.getNewComMail = getNewComMail;