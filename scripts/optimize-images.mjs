import sharp from 'sharp';
import { readdir, rename, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const IMAGE_DIR = './public/images';
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;

const files = await readdir(IMAGE_DIR);
const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

console.log(`Converting ${images.length} images to WebP...\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const file of images) {
  const inputPath = path.join(IMAGE_DIR, file);
  const baseName = file.replace(/\.(jpg|jpeg|png)$/i, '');
  const outputPath = path.join(IMAGE_DIR, `${baseName}.webp`);

  const { size: sizeBefore } = await import('fs').then(fs =>
    fs.promises.stat(inputPath)
  );

  await sharp(inputPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);

  const { size: sizeAfter } = await import('fs').then(fs =>
    fs.promises.stat(outputPath)
  );

  const saving = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(0);
  const beforeKB = (sizeBefore / 1024).toFixed(0);
  const afterKB = (sizeAfter / 1024).toFixed(0);

  console.log(`${file}`);
  console.log(`  ${beforeKB}KB → ${afterKB}KB  (-${saving}%)\n`);

  totalBefore += sizeBefore;
  totalAfter += sizeAfter;

  // Remove original after successful conversion
  await unlink(inputPath);
}

const totalSaving = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0);
console.log('='.repeat(50));
console.log(`Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB  (-${totalSaving}%)`);
