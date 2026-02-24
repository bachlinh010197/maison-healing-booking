import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const size = 128;
const inputPath = path.join(__dirname, '..', 'src', 'assets', 'logo.jpg');
const outputPath = path.join(__dirname, '..', 'public', 'logo.png');

// Create circular mask
const circleMask = Buffer.from(
  `<svg width="${size}" height="${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/>
  </svg>`
);

await sharp(inputPath)
  .resize(size, size, { fit: 'cover' })
  .composite([{ input: circleMask, blend: 'dest-in' }])
  .png()
  .toFile(outputPath);

console.log('Circular favicon generated: public/logo.png');
