const getNewLikeMail = (username, title, liker, likes, picId) => {

  const mail = {
    subject: "😊 You received a new like !",
    html:
      `   
          <head>
          </head>
          <body>
            <main>
              <h1>Good news, ${username} !</h1>
              <h2>Your photo "${title}" just have been liked by ${liker} !</h2>
              <p>Your photo reached a total of ${likes} likes.</p>
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

exports.getNewLikeMail = getNewLikeMail;