const express = require('express');

module.exports = express.raw({ type: 'application/octet-stream', limit: '5mb' });
