const nJwt = require("njwt");
const path = require("path");
const fs = require("fs-extra");

const secretFile = path.resolve(__dirname, "etc", "secret");
if (!fs.existsSync(secretFile)) {
    // eslint-disable-next-line no-console
    console.error("Please run 'npm run config' first.");
    process.exit(1);
}
if (!process.argv[2]) {
    // eslint-disable-next-line no-console
    console.error("Usage: node token <command>");
    process.exit(1);
}
const signingKey = fs.readFileSync(secretFile);
const claims = {
    command: process.argv[2],
};
const jwt = nJwt.create(claims, signingKey);
jwt.setExpiration(new Date().getTime() + (60 * 60 * 1000 * 8760)); // 1 Year
const token = jwt.compact();
// eslint-disable-next-line no-console
console.log(token);
