const Fastify = require("fastify");
const path = require("path");
const logger = require("./logger");

const config = require(path.resolve("etc", "config.json"));

(async () => {
    const fastify = Fastify({
        logger,
        trustProxy: config.trustProxy,
        ignoreTrailingSlash: true
    });
    fastify.listen(config.port, config.ip);
})();
