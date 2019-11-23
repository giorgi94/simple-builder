const PluginError = require("plugin-error");
const through = require("through2");
const path = require("path");
const transform = require("./transform");

const PLUGIN_NAME = "gulp-requirejs";

const gulpRequirejs = (options, sync) => through.obj((file, enc, cb) => {

    const resolve = options.resolve || {};
    const extensions = options.extensions || [".js"];

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
        file.contents = Buffer.from(transform(content, resolve, extensions), "utf-8");
        return cb(null, file);
    } catch (e) {
        return cb(e);
    }

});


gulpRequirejs.sync = options => gulpRequirejs(options, true);

gulpRequirejs.logError = function logError(error) {
    let message = "";

    if (typeof error === "string") {
        message = new PluginError("requirejs", error).toString();
    } else {
        message = new PluginError("requirejs", error.message).toString();
    }
    process.stderr.write(`${message}\n`);
    this.emit("end");
};


module.exports = gulpRequirejs;
