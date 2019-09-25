const gulp = require('gulp');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const watch = require('gulp-watch');
const fs = require('fs');
const path = require('path');
const yaml = require('gulp-yaml');
const swaggerGenerator = require('gulp-apidoc-swagger');

gulp.task('nodeMon', function () {
	gutil.log(gutil.colors.yellow('=> Firing up node server + nodemon ...'));
	nodemon({
		script: './app/www/index.js',
		ext: 'js',
		env: { 'NODE_ENV': 'local' }
	})
});

gulp.task('swaggerGenerator', function(){
	swaggerGenerator.exec({
		src: "app/routes",
		dest: "doc/"
	});
});


gulp.task('default', ['nodeMon']);

gulp.task('developer', ['dev']);
