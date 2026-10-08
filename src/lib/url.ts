// Ajoute automatiquement le préfixe du site (ex. « /Coco_halin ») aux liens
// internes, pour que le site fonctionne sur GitHub Pages comme sur un domaine.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

// Indique si un lien de navigation correspond à la page actuelle.
export function isActive(href: string, currentPath: string): boolean {
  const target = url(href);
  if (href === '/') return currentPath === target || currentPath === `${base}/`;
  return currentPath.startsWith(target);
}
