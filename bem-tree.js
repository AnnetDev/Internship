import bemlinter from 'gulp-html-bemlinter';
import vfs from 'vinyl-fs';

vfs
  .src(['./source/**/*.html', '!./source/**/vendor/*.html'])
  .pipe(bemlinter())
