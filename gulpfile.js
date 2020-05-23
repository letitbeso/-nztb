let gulp =require("gulp");
let htmlmin = require("gulp-htmlmin");
let uglify =require("gulp-uglify");
let sass = require("gulp-sass");
let babel = require("gulp-babel")

gulp.task("default",async()=>{
    //压缩html
    gulp.watch("./src/*.html",async()=>{
        gulp.src("./src/*.html")
        .pipe(htmlmin({
            collapseWhitespace:true
        }))
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\nztb"));
    })
    //压缩js
    gulp.watch("./src/js/*.js",async()=>{
        gulp.src("./src/js/*.js")
        .pipe(babel({
            presets:['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\nztb\\js"))
    })
    //编译sass
    gulp.watch("./src/css/*.scss",async()=>{
        gulp.src("./src/css/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\nztb\\css"))
    })

    //php
    gulp.watch("./src/php/**/*",async()=>{
        gulp.src("./src/php/**/*")
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\nztb\\php"))
    })
    
})