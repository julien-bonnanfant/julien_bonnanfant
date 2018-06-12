var watch = require("gulp-watch");

var gulp = require("gulp");
var postcss = require("gulp-postcss");

gulp.task("css", function() {
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
        .pipe(gulp.dest("./dest"));

});
gulp.task("watch",function() {
    watch("./src/css/*.css", function () {
        return gulp.start('css');
    });
});

gulp.task("default",['css','watch']);