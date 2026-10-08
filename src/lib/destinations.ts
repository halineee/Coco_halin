import { fr } from './text';
import { getImagesInFolder } from './images';

// Toutes les destinations du carnet : un fichier .yaml par ville dans
// src/content/destinations/. Le nom du fichier devient l'adresse de la page
// (ex. busan.yaml → /carnet-de-voyage/busan/).
export interface Place {
  name: string;
  korean?: string;
  text: string;
  /** Afficher les liens de carte (true) ou non (false). Par défaut : selon la rubrique. */
  carte?: boolean;
  /** Recherche personnalisée pour les cartes (en coréen de préférence) */
  recherche?: string;
  /** Photo facultative (chemin à partir de src/assets/) */
  photo?: string;
}

export interface Destination {
  slug: string;
  order: number;
  name: string;
  korean: string;
  tagline: string;
  cardText: string;
  intro: string;
  /** Photos du dossier src/assets/destinations/<slug>/ ; la première sert de vignette */
  photos: string[];
  aVoir: Place[];
  aGouter: Place[];
  aFaire: Place[];
  conseils: { duree: string; ouLoger: string; transport: string; tips?: string[] };
  suggestions?: Place[];
  adresses?: string[];
}

const files = import.meta.glob<{ default: Omit<Destination, 'slug' | 'photos'> }>('/src/content/destinations/*.yaml', { eager: true });

export const destinations: Destination[] = Object.entries(files)
  .map(([path, mod]) => {
    const slug = path.split('/').pop()!.replace('.yaml', '');
    const photos = getImagesInFolder(`destinations/${slug}`).map((p) => p.path);
    return { slug, ...fr(mod.default), photos };
  })
  .sort((a, b) => a.order - b.order);
