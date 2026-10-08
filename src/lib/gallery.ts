import type { ImageMetadata } from 'astro';
import { getImage as optimizeImage } from 'astro:assets';
import { getImagesInFolder } from './images';

export interface GalleryPhoto {
  path: string;
  image: ImageMetadata;
  alt: string;
  size: 'normal' | 'grande';
  orientation: 'portrait' | 'paysage' | 'carre';
  // Version grand format pour l'affichage plein écran
  full: { src: string; width: number; height: number };
}

type Details = Record<string, { alt?: string; taille?: string } | undefined>;

// Prépare toutes les photos d'un dossier pour une galerie.
export async function loadGallery(folder: string, details: Details = {}, defaultAlt = 'Photo'): Promise<GalleryPhoto[]> {
  const files = getImagesInFolder(folder);
  return Promise.all(
    files.map(async ({ path, image }, index) => {
      const info = details?.[path] ?? {};
      const ratio = image.width / image.height;
      const width = Math.min(image.width, 2000);
      const full = await optimizeImage({ src: image, width, format: 'webp', quality: 82 });
      return {
        path,
        image,
        alt: info.alt ?? `${defaultAlt} ${index + 1}`,
        size: info.taille === 'grande' ? 'grande' : 'normal',
        orientation: ratio > 1.15 ? 'paysage' : ratio < 0.87 ? 'portrait' : 'carre',
        full: { src: full.src, width, height: Math.round(width / ratio) },
      } satisfies GalleryPhoto;
    }),
  );
}
