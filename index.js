const Fastify = require("fastify");
const path = require("path");
const logger = require("./logger");
const routeExecute = require("./routeExecute");

const config = require(path.resolve("etc", "config.json"));

(async () => {
    const fastify = Fastify({
        logger,
        trustProxy: config.trustProxy,
        ignoreTrailingSlash: true
    });
    fastify.register(require("fastify-favicon"));
    fastify.get("/execute/:id", routeExecute());
    fastify.listen(config.port, config.ip);
})();
