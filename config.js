const path = require("path");
const fs = require("fs-extra");
const secureRandom = require("secure-random");

const distConfig = fs.readJSONSync(path.resolve(__dirname, "etc", "config.dist.json"));
fs.writeJSONSync(path.resolve(__dirname, "etc", "config.json"), distConfig, {
    spaces: "\t"
});
fs.writeFileSync(path.resolve(__dirname, "etc", "secret"), secureRandom(256, {
    type: "Buffer"
}));
// eslint-disable-next-line no-console
console.log("Done.");
