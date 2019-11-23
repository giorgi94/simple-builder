const { src, dest, series, parallel, watch } = require("gulp");

// const rename = require("gulp-rename");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const vue = require("./plugins/gulp-vue");
const rjs = require("./plugins/gulp-requirejs");
const inc = require("./plugins/gulp-include");


const CopyToLib = function () {
    return src([
        "./node_modules/vue/dist/vue.min.js",
        "./node_modules/vue-router/dist/vue-router.min.js",
        "./node_modules/vuex/dist/vuex.min.js",
        "./lib/*"
    ]).pipe(dest("./dist/lib"));
};

const JsBuild = function () {
    return src("./src/**/*.js")
        .pipe(inc())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(terser())
        .pipe(rjs())
        .pipe(sourcemaps.write("./maps"))
        .pipe(dest("./dist/bundles"));
};

const VueBuild = function () {
    return src("./src/**/*.vue")
        .pipe(sourcemaps.init())
        .pipe(vue({}).on("error", vue.logError))
        .pipe(babel())
        .pipe(terser())
        .pipe(rjs())
        .pipe(sourcemaps.write("./maps"))
        .pipe(dest("./dist/bundles"));
};


const SassBuild = function () {
    return src("./assets/sass/main.sass")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(sourcemaps.write("./maps"))
        .pipe(dest("./dist/css"));
};

const WatchBuild = function () {
    watch("./assets/sass/**/*.sass", series("sass"));
    watch("./src/**/*.vue", series("vue"));
    watch("./src/**/*.js", series("js"));
};

exports.js = JsBuild;
exports.vue = VueBuild;
exports.sass = SassBuild;
exports.watch = WatchBuild;

exports.copy = CopyToLib;



exports.default = parallel(JsBuild, VueBuild, SassBuild);
