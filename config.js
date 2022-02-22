const path = require("path");
const fs = require("fs-extra");

const distConfig = fs.readJSONSync(path.resolve("etc", "config.dist.json"));
fs.writeJSONSync(path.resolve("etc", "config.json"), distConfig, {
    spaces: "\t"
});
// eslint-disable-next-line no-console
console.log("Done.");
