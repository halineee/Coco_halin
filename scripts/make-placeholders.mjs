// Génère des images « en attente » (dégradés doux) pour tester la mise en page.
// Usage : node scripts/make-placeholders.mjs <dossier> <nombre> <largeur> <hauteur> [prefixe]
// Ces images sont à remplacer par vos vraies photos (même nom de fichier ou nouveaux noms).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [folder, count = '1', w = '1200', h = '1500', prefix = ''] = process.argv.slice(2);
if (!folder) {
  console.error('Usage : node scripts/make-placeholders.mjs <dossier> <nombre> <largeur> <hauteur>');
  process.exit(1);
}

const palettes = [
  ['#d9d4cc', '#b9b1a6', '#8f877d'],
  ['#d6d7dc', '#aeb0b9', '#7e808b'],
  ['#d8d6cb', '#b5b3a1', '#83826f'],
  ['#ddd3cf', '#bfaea8', '#917f79'],
  ['#d3d8d6', '#a9b3b0', '#77837f'],
  ['#dcd8e0', '#b8b1c0', '#867e90'],
];

const dir = join('src/assets', folder);
mkdirSync(dir, { recursive: true });

for (let i = 0; i < Number(count); i++) {
  const [c1, c2, c3] = palettes[i % palettes.length];
  const W = Number(w);
  const H = Number(h);
  const cx = 0.3 + ((i * 37) % 40) / 100;
  const cy = 0.35 + ((i * 53) % 30) / 100;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="${i % 2 ? 1 : 0.3}" y2="1">
        <stop offset="0" stop-color="${c1}"/>
        <stop offset="0.6" stop-color="${c2}"/>
        <stop offset="1" stop-color="${c3}"/>
      </linearGradient>
      <radialGradient id="r" cx="${cx}" cy="${cy}" r="0.55">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.3  0 0 0 0 0.3  0 0 0 0.09 0"/></filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#r)"/>
    <rect width="100%" height="100%" filter="url(#n)"/>
    <text x="50%" y="50%" text-anchor="middle" font-family="Georgia, serif" font-style="italic"
      font-size="${Math.round(Math.min(W, H) / 16)}" fill="#ffffff" fill-opacity="0.85">photo à venir</text>
    <text x="50%" y="${H / 2 + Math.min(W, H) / 11}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
      letter-spacing="6" font-size="${Math.round(Math.min(W, H) / 40)}" fill="#ffffff" fill-opacity="0.7">${String(i + 1).padStart(2, '0')}</text>
  </svg>`;
  const name = `${prefix}${String(i + 1).padStart(2, '0')}.jpg`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(join(dir, name));
  console.log('✓', join(dir, name));
}
