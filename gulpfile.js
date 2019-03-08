var watch = require("gulp-watch");
var concatCss = require('gulp-concat-css');
var gulp = require("gulp");
var postcss = require("gulp-postcss");
var htmllint = require('gulp-htmllint');
var fancyLog = require('fancy-log');
var colors = require('ansi-colors');


gulp.task("css", function () {
    return gulp
        .src("./src/css/*.css")
        .pipe(
            postcss([
                require("postcss-import")(),
                require("postcss-url")(),
                require("postcss-cssnext")(),
                // add your "plugins" here
                // ...
                // and if you want to compress
                // Disable autoprefixer, because it's already included in cssnext
                // require("cssnano")({ autoprefixer: false }),
                require("postcss-browser-reporter")(),
                require("postcss-reporter")()
            ])
        )
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('dest/'));

});
gulp.task("watch",function() {
    watch("./src/css/*.css", function () {
        return gulp.start('css');
    });
    watch("./index.html", function () {
        return gulp.start('html');
    });
});

gulp.task("default",['css','watch','html']);

gulp.task('html', function() {
    return gulp.src('./index.html')
        .pipe(htmllint({}, htmllintReporter));
});


function htmllintReporter(filepath, issues) {
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            fancyLog(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg));
        });

        process.exitCode = 1;
    }
}
