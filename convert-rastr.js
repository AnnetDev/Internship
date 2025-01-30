import sharp from 'sharp';
import { globSync } from 'glob';
import cliProgress from 'cli-progress';

// Get all files with extensions jpg and png
const files = globSync('source/**/*.{png,jpg,jpeg}');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
// Convert all files to webp
bar1.start(files.length, 0);
const work = files.map(async (file) => {
  const [fileName] = file.split('.');
  const webpFileName = `${fileName}.webp`;

  // Convert the file to webp
  await sharp(file)
    .webp()
    .toFile(webpFileName);

  // todo resize from 2x
  bar1.increment();
});
Promise.all(work).then(() => {
  bar1.stop();
});
