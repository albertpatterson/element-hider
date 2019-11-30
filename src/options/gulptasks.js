module.exports = function(createTaskFactory) {
  const taskFactory = createTaskFactory('options');
  const buildDir = 'dist/unpacked/options/';

  const cleanTask = taskFactory.clean([buildDir]);

  const sassTask = taskFactory.sass(
      'src/options/styles/**/*.scss', buildDir, 'options-styles.css');

  const sassProdTask = taskFactory.sassProd(
      'src/options/styles/**/*.scss', buildDir, 'options-styles.css');

  const htmlTask = taskFactory.html('src/options/options.html', buildDir);

  const htmlProdTask =
      taskFactory.htmlProd('src/options/options.html', buildDir);

  const tsTask = taskFactory.ts(
      './', ['src/options/main/main.ts'], buildDir, 'options-bundle.js');

  const tsProdTask = taskFactory.tsProd(
      './', ['src/options/main/main.ts'], buildDir, 'options-bundle.js');

  const testFiles =
      ['main/**/*.ts', 'test/**/*Spec.ts'].map(f => `${__dirname}/${f}`);
  const testTask = taskFactory.test(testFiles);

  const lintTask = taskFactory.lint(['src/options/**/*.ts']);

  const compileTask = taskFactory.compile(
      (series, parallel) =>
          series(cleanTask, parallel(tsTask, htmlTask, sassTask)));

  const compileProdTask = taskFactory.compileProd(
      (series, parallel) =>
          series(cleanTask, parallel(tsProdTask, htmlProdTask, sassProdTask)));

  taskFactory.watch(['src/options/**/*'], [testTask, compileTask, lintTask]);
}
