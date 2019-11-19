const { src, dest, series, parallel, watch } = require("gulp");

const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const vue = require("./plugins/gulp-vue");

const VueBuild = function () {
    return src("./src/**/*.vue")
        .pipe(vue({}).on("error", vue.logError))
        .pipe(dest("./dist/js"));
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
};

exports.vue = VueBuild;
exports.sass = SassBuild;
exports.watch = WatchBuild;




exports.default = parallel(VueBuild, SassBuild);
