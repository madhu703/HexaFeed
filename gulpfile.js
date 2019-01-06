"use strict";
var gulp = require('gulp');
var watch = require('gulp-watch');
var nodemon = require('gulp-nodemon');
var config = require('config');
var runSequence = require('run-sequence');

gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: './bin/www',
        ext: 'js json',
        env: { "NODE_ENV": "development" },
        ignore: [
            'src/',
            'dist/',
            'node_modules/'
        ],
        watch: [ './REST/models','./REST/services' , 'server.js'],
        stdout: true,
        readable: true
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }
    });
});


gulp.task('default', function () {
    console.log(process.env.NODE_ENV);
    let env = process.env.NODE_ENV;
    if (!env) {
        env = 'development';
    }
    if (env === 'development') {
        runSequence('nodemon');
    } else {
    }
});