const fs = require('fs');
const path = require('path');

const cleanLogs = () => {

    const logs = path.join('logs', 'logs.txt');

    fs.unlink(logs, (err) => {
        if (err) {
            const error = new Error(err);

            error.httpStatusCode = 409;

            throw (error);
        }
    })

    console.log("The logs file has been deleted successfully.");
    process.exit(0);
}

module.exports = cleanLogs();