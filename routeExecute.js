const nJwt = require("njwt");
const path = require("path");
const fs = require("fs-extra");
const {
    exec
} = require("child_process");

const config = require(path.resolve("etc", "config.json"));
const signingKey = fs.readFileSync(path.resolve(__dirname, "etc", "secret"));

const execCommand = async cmd => new Promise((resolve, reject) => {
    let exitCode;
    const workerProcess = exec(cmd, (error, stdout, stderr) => {
        if (exitCode === 0) {
            resolve(stdout);
        } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(new Error(`${stdout || ""}${stderr || ""}`));
        }
    });
    workerProcess.on("exit", code => exitCode = code);
});

module.exports = () => ({
    async handler(req, rep) {
        const {
            id
        } = req.params;
        const token = req.headers.authorization;
        rep.type("application/json");
        if (!config.commands[id] || !token || typeof token !== "string" || !token.match(/^Bearer /)) {
            rep.code(400);
            rep.send({
                error: "Missing command or authorization token",
            });
            return;
        }
        try {
            const verifiedJwt = nJwt.verify(token.replace(/^Bearer /, ""), signingKey);
            if (verifiedJwt.body.command !== id) {
                throw new Error("Not authorized to run the requested command");
            }
        } catch (e) {
            rep.code(401);
            rep.send({
                error: e.message,
            });
            return;
        }
        const output = await execCommand(config.commands[id]);
        rep.send({
            command: config.commands[id],
            output
        });
    }
});
