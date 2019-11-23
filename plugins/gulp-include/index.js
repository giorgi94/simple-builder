const PluginError = require("plugin-error");
const through = require("through2");
const path = require("path");
const transform = require("./transform");

const PLUGIN_NAME = "gulp-requirejs";


const gulpInclude = (options, sync) => through.obj((file, enc, cb) => {

    if (file.isNull()) {
        return cb(null, file);
    }

    if (file.isStream()) {
        return cb(new PluginError(PLUGIN_NAME, "Streaming not supported"));
    }

    if (path.basename(file.path).indexOf("_") === 0) {
        return cb();
    }


    if (!file.contents.length) {
        return cb(null, file);
    }

    let content = file.contents.toString();


    try {
        file.contents = Buffer.from(transform(content, file.path), "utf-8");
        return cb(null, file);
    } catch (e) {
        return cb(e);
    }

});


gulpInclude.sync = options => gulpInclude(options, true);

gulpInclude.logError = function logError(error) {
    let message = "";

    if (typeof error === "string") {
        message = new PluginError("requirejs", error).toString();
    } else {
        message = new PluginError("requirejs", error.message).toString();
    }
    process.stderr.write(`${message}\n`);
    this.emit("end");
};


module.exports = gulpInclude;
