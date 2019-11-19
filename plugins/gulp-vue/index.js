const PluginError = require("plugin-error");
const through = require("through2");
const path = require("path");
const transform = require("./transform");

const PLUGIN_NAME = "gulp-vue";

const gulpVue = (options, sync) => through.obj((file, enc, cb) => {
    if (file.isNull()) {
        return cb(null, file);
    }

    if (file.isStream()) {
        return cb(new PluginError(PLUGIN_NAME, "Streaming not supported"));
    }

    if (path.basename(file.path).indexOf("_") === 0) {
        return cb();
    }

    file.basename = file.basename.replace(".vue", ".js");

    if (!file.contents.length) {
        return cb(null, file);
    }

    let content = file.contents.toString();

    try {
        file.contents = Buffer.from(transform(content), "utf-8");
        return cb(null, file);
    } catch (e) {
        return cb(e.message);
    }

});


gulpVue.sync = options => gulpVue(options, true);

gulpVue.logError = function logError(error) {
    const message = new PluginError("vue", error.message).toString();
    process.stderr.write(`${message}\n`);
    this.emit("end");
};


module.exports = gulpVue;
