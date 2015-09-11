import url from 'url';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

import autoprefixer from 'autoprefixer-core';
import browserSync from 'browser-sync';
import del from 'del';
import nunjucks from 'nunjucks';
import map from 'vinyl-map';
import quaff from 'quaff';
import runSequence from 'run-sequence';
import yargs from 'yargs';

const $ = gulpLoadPlugins();
const args = yargs.argv;
const bs = browserSync.create();

const config = require('./config');

let data = quaff(config.dataFolder);

let basePath = args.production ? url.resolve('/', config.deploy.key) + '/' : '/';
data.PATH_PREFIX = basePath;

let fullPath = url.format({
  protocol: 'http',
  host: config.deploy.bucket,
  pathname: config.deploy.key
}) + '/';
data.PATH_FULL = fullPath;

let env = nunjucks.configure(config.templateFolder, {autoescape: false});

gulp.task('jshint', () => {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(bs.reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!bs.active, $.jshint.reporter('fail')));
});

gulp.task('scripts', ['jshint'], () => {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(gulp.dest('./dist/scripts'))
    .pipe($.size({title: 'scripts'}));
});

gulp.task('images', () => {
  return gulp.src('./app/assets/images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./dist/assets/images'))
    .pipe($.size({title: 'images'}));
});

gulp.task('fonts', () => {
  return gulp.src(['./app/assets/fonts/**/*'])
    .pipe(gulp.dest('./dist/assets/fonts'))
    .pipe($.size({title: 'fonts'}));
});

gulp.task('assets', () => {
  return gulp.src(['app/assets/*', '!app/assets/images', '!app/assets/fonts'])
    .pipe(gulp.dest('./dist/assets'))
    .pipe($.size({title: 'assets'}));
});

gulp.task('templates', () => {
  let nunjuckify = map((code, filename) => {
    return env.renderString(code.toString(), {data: data});
  });

  // All .html files are valid, unless they are found in templates
  return gulp.src(['./app/**/*.html', `!${config.templateFolder}/**`])
    .pipe(nunjuckify)
    .pipe(gulp.dest('./.tmp'))
    .pipe($.if(args.production, $.minifyHtml()))
    .pipe($.if(args.production, gulp.dest('./dist')))
    .pipe($.size({title: 'templates'}));
});

gulp.task('styles', () => {
  let nunjuckify = map((code, filename) => {
    return env.renderString(code.toString(), {data: data});
  });

  return gulp.src(['./app/styles/**/*.scss'])
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: ['node_modules'],
      precision: 10
    }).on('error', $.sass.logError))
    .pipe(nunjuckify)
    .pipe($.postcss([
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ]))
    .pipe($.if(args.production, $.minifyCss({
      keepSpecialComments: 0
    })))
    .pipe($.sourcemaps.write(args.production ? '.' : undefined))
    .pipe(gulp.dest('./.tmp/styles/'))
    .pipe($.if(args.production, gulp.dest('./dist/styles')))
    .pipe(bs.stream({
      match: '**/*.css'
    }))
    .pipe($.size({title: 'styles'}));
});

gulp.task('serve', ['templates', 'styles'], () => {
  bs.init({
    notify: false,
    logConnections: true,
    logPrefix: 'NEWSAPPS',
    open: false,
    server: {
      baseDir: ['./.tmp', './app'],
      routes: {
        '/node_modules': 'node_modules',
      }
    }
  });

  gulp.watch(['./app/styles/**/*.scss'], ['styles']);
  gulp.watch(['./app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['./app/**/*.html'], ['templates', bs.reload]);
});

gulp.task('clean', cb => {
  return del(['./.tmp/**', './dist/**', '!dist/.git'], {dot: true}, cb);
});

gulp.task('build', ['clean'], cb => {
  runSequence(['assets', 'fonts', 'images', 'jshint', 'scripts', 'styles', 'templates'], cb);
});

gulp.task('default', ['build']);
