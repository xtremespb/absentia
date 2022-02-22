const pino = require("pino");
const path = require("path");

const config = require(path.resolve("etc", "config.json"));

module.exports = pino({
    level: config.logLevel,
    serializers: {
        req(request) {
            return {
                method: request.method,
                url: request.url,
                hostname: request.hostname,
                remoteAddress: request.ip,
                remotePort: request.socket.remotePort,
            };
        }
    }
});
