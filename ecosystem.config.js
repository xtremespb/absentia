const path = require("path");

module.exports = {
    apps: [{
        script: "./index.js",
        watch: false,
        exec_mode: "cluster",
        instances: 1,
        merge_logs: true,
        time: false,
        name: "absentia",
        error_file: path.resolve(`${__dirname}/logs/absentia_error.log`),
        out_file: path.resolve(`${__dirname}/logs/absentia_out.log`),
        log_file: "/dev/null",
    }]
};
