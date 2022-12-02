const fs = require('fs');
const path = require('path');

const addToLogs = async (type, message) => {

    const logs = path.join('logs', 'logs.txt');

    const logsFile = fs.createWriteStream(logs, { flags: 'a' });

    logsFile.on('open', () => {

        const date = new Date();
        const text = date.toUTCString() + ' | [' + type + '] | ' + message + '\n';
    
        logsFile.write(text);
        logsFile.end();
    });

}

module.exports = addToLogs;