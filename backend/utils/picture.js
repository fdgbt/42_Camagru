const fs = require('fs');
const fsp = require('fs').promises;
const https = require('https');
const jimp = require('jimp');

const Picture = require('../models/picture');

const applyEffects = async (body, pathFile) => {
    try {

        const height = 720;
        const width = 1280;
        let totalEffect = body.effects.length;
        let extraEffect = false;
        let specialEffect = false;

        const camImage = await jimp.read(pathFile);
        let i = 0;

        await camImage.resize(width, height);

        while (i < totalEffect) {

            const effectType = +body.effects[i].type;

            if (effectType > 2) {

                specialEffect = effectType;

            } else if (effectType === 2) {

                extraEffect = body.effects[i].value;

            } else if (effectType === 1) {

                const camEffect = await jimp.read(body.effects[i].value);

                const sizeCoefX = Number(body.effects[i].camWidth) / width;
                const sizeCoefY = Number(body.effects[i].camHeight) / height;
                const offsetX = Number(body.effects[i].offsetX) / sizeCoefX;
                const offsetY = Number(body.effects[i].offsetY) / sizeCoefY;
                const offsetW = Number(body.effects[i].offsetW) / sizeCoefX;

                await camEffect.resize(offsetW, jimp.AUTO);
                await camImage.composite(camEffect, offsetX, offsetY);
            
            }
            i++;
        }

        if (extraEffect) {

            const camEffect = await jimp.read(extraEffect);

            await camEffect.resize(width, height);
            await camImage.composite(camEffect, 0, 0);

        } else if (specialEffect) {

            if (specialEffect === 3)
                camImage.blur(4);
            else if (specialEffect === 4)
                camImage.greyscale();
            else if (specialEffect === 5)
                camImage.sepia();
            else if (specialEffect === 6)
                camImage.invert();
            else if (specialEffect === 7)
                camImage.posterize(5);
            else if (specialEffect === 8)
                camImage.pixelate(8);
            else if (specialEffect === 9)
                camImage.fisheye();
            else if (specialEffect === 10)
                camImage.circle();
        }

        await camImage.writeAsync(pathFile);

    } catch (err) {

        throw (err);
    }
}

const cam = async (session, body) => {

    try {

        const date = new Date();
        const userId = session.user._id;

        const title = session.user.username + "'s new photo";
        const description = "Taken the " + date.toUTCString() + ".";

        const imgDataUrl = body.imgDataUrl;
        const base64Data = imgDataUrl.replace(/^data:image\/png;base64,/, "");

        const nameFile = session.user._id + '_' + date.valueOf().toString();
        const pathFile = "data/cam/" + nameFile + ".png";

        const visible = session.user.prefs.visibility;

        await fsp.writeFile(pathFile, base64Data, 'base64');

        await applyEffects(body, pathFile);

        return new Picture(title, description, date, pathFile, [], [], visible, userId, null);

    } catch (err) {

        throw (err);
    }
};

const upload = async (session, body, file) => {

    try {

        const date = new Date();
        const userId = session.user._id;

        const title = session.user.username + "'s new upload";
        const description = "Uploaded the " + date.toUTCString() + ".";

        const pathFile = file.path;

        const visible = session.user.prefs.visibility;

        await applyEffects(body, pathFile);

        return new Picture(title, description, date, pathFile, [], [], visible, userId, null);

    } catch (err) {

        throw (err);
    }
}

const httpsGet = async (url, file) => {

    try {

        return new Promise((resolve, reject) => {
            https.get(url, response => {

                response.pipe(file);

                file
                    .on('finish', () => {
                        file.close();
                        resolve(file);
                    })
                    .on('error', (err) => {
                        file.close();
                        reject(err);
                    });
            })
                .on('error', (err) => {
                    file.close();
                    reject(err);
                });;
        });

    } catch (err) {

        throw (err);
    }
}

const link = async (session, body, url) => {

    try {

        const date = new Date();
        const userId = session.user._id;

        const title = session.user.username + "'s new link";
        const description = "Linked the " + date.toUTCString() + ".";

        const nameFile = session.user._id + '_' + date.valueOf().toString();
        const pathFile = "data/link/" + nameFile + ".png";

        const visible = session.user.prefs.visibility;

        const file = fs.createWriteStream(pathFile);

        const download = await httpsGet(url, file);

        if (download.bytesWritten > 0) {

            await applyEffects(body, pathFile);

            return new Picture(title, description, date, pathFile, [], [], visible, userId, null);

        } else {
            return null
        }
    } catch (err) {

        throw (err);
    }
}

const update = (body, picture) => {

    const userId = picture.userId;

    const date = picture.date;
    const pathFile = picture.imgUrl;
    const likes = picture.likes;
    const comments = picture.comments;
    const id = picture._id;

    const title = decodeURI(body.title);
    const description = decodeURI(body.description);
    const visible = body.visibility;

    return new Picture(title, description, date, pathFile, likes, comments, visible, userId, id);
}

module.exports = {
    cam, upload, link, update
};
