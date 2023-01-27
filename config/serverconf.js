
require('dotenv').config();
var config = require('./config.js').get(process.env.NODE_ENV);

function getServerAddress() {
    var address,
        ifaces = require('os').networkInterfaces();
    for (var dev in ifaces) {
        ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address: undefined);
    }

    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'prod') {
        address = config.hostname;
    }

    return "http://" + address + ":" + config.port;
}

function getHostAddress() {
    var address,
        ifaces = require('os').networkInterfaces();
    for (var dev in ifaces) {
        ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address: undefined);
    }

    let hostname = address;
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'prod') {
        hostname = config.hostname;
    }
    return hostname;
}

exports.ServerAddress = getServerAddress;
exports.HostAddress = getHostAddress;