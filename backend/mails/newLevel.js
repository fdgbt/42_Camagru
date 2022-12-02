const getNewLevelMail = (username, likes, rank, title, liker, picId) => {

  const mail = {
    subject: "🤩 You reached a new level !",
    html:
      `   
          <head>
          </head>
          <body>
            <main>
              <h1>Amazing news, ${username} !</h1>
              <h2>You just beat your own record with a total of ${likes} likes for only one photo !</h2>
              <p>As a reward, your rank increased to level <b>${rank}</b> !</p>
              <p>Congratulations !</p>
              <p>you can check your <a href='${global.domainName}/statistics'>account profile</a> to confirm your new rank.</p>
              <p>One last thing, your photo "${title}" have been liked by ${liker} !</p>
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

exports.getNewLevelMail = getNewLevelMail;