import type { ImageMetadata } from 'astro';

// Toutes les images placées dans src/assets/ sont repérées automatiquement.
// Dans les fichiers .yaml, il suffit d'écrire leur chemin à partir de
// src/assets/, par exemple : "photos/accueil/polaroid.jpg".
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

export function getImage(path: string): ImageMetadata {
  const key = `/src/assets/${path.replace(/^\/+/, '')}`;
  const image = images[key];
  if (!image) {
    throw new Error(
      `Image introuvable : « ${path} ». Vérifiez que le fichier existe bien dans src/assets/.`,
    );
  }
  return image.default;
}

// Renvoie toutes les images d'un dossier, triées par nom de fichier
// (01.jpg, 02.jpg, …). Pratique pour les galeries : il suffit d'ajouter
// des photos dans le dossier.
export function getImagesInFolder(folder: string): { path: string; image: ImageMetadata }[] {
  const prefix = `/src/assets/${folder.replace(/^\/+|\/+$/g, '')}/`;
  return Object.entries(images)
    .filter(([key]) => key.startsWith(prefix) && !key.slice(prefix.length).includes('/'))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([key, mod]) => ({ path: key.replace('/src/assets/', ''), image: mod.default }));
}
