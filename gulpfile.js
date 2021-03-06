var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');


gulp.task('clean', function() {
    return gulp
            .src('dist')
            .pipe(clean());
});

gulp.task('copy-opts', function() {
    return gulp.src('tests/integration/config/mocha.opts')
                .pipe(gulp.dest('dist/tests/unit/config'))
                .pipe(gulp.dest('dist/tests/integration/config'))
})

gulp.task('compile', function() {
    return tsProject.src()
                    .pipe(tsProject())
                    .js.pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.series('clean', 'compile', 'copy-opts'));