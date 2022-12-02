const fs = require('fs');
const path = require('path');

const addToLogs = require('./logs');

const cleanData = () => {

    const data = path.join('data');

    fs.readdir(data, (err, dataFolders) => {

        if (err) {
            const error = new Error(err);

            error.httpStatusCode = 409;

            throw (error);
        }

        let dataLength = dataFolders.length;

        dataFolders.forEach((dataFolder) => {

            const folder = path.join('data', dataFolder);

            fs.readdir(folder, (err, pics) => {

                console.log(dataFolder,":", pics)

                if (err) {
                    const error = new Error(err);

                    error.httpStatusCode = 409;

                    throw (error);
                }

                let picsLength = pics.length;

                pics
                    .forEach((pic) => {

                        const picPath = path.join('data', dataFolder, pic);

                        fs.unlink(picPath, (err) => {
                            if (err) {
                                const error = new Error(err);

                                error.httpStatusCode = 409;

                                throw (error);
                            }
                            picsLength--;
                            if (!picsLength) {
                                console.log("Folder", dataFolder, "wiped successfully.");
                                dataLength--;
                            }
                            if (!dataLength) {
                                addToLogs("SCRIPT", "Data Folder wiped successfully");
                                process.exit(0);
                            }
                        });
                    })
            });
        });
    });
}

module.exports = cleanData();