import { fr } from './text';

// Toutes les destinations du carnet : un fichier .yaml par ville dans
// src/content/destinations/. Le nom du fichier devient l'adresse de la page
// (ex. busan.yaml → /carnet-de-voyage/busan/).
export interface Place {
  name: string;
  korean?: string;
  text: string;
}

export interface Destination {
  slug: string;
  order: number;
  name: string;
  korean: string;
  tagline: string;
  cardText: string;
  hero: string;
  intro: string;
  aVoir: Place[];
  aGouter: Place[];
  aFaire: Place[];
  conseils: { duree: string; ouLoger: string; transport: string; tips?: string[] };
  adresses?: string[];
}

const files = import.meta.glob<{ default: Omit<Destination, 'slug'> }>('/src/content/destinations/*.yaml', { eager: true });

export const destinations: Destination[] = Object.entries(files)
  .map(([path, mod]) => ({ slug: path.split('/').pop()!.replace('.yaml', ''), ...fr(mod.default) }))
  .sort((a, b) => a.order - b.order);
