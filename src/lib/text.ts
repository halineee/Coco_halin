// Un texte commençant par « À compléter » est affiché comme provisoire.
export const isTodo = (text: string | undefined) => !!text && /^à compléter/i.test(text.trim());

// Typographie française : espaces insécables avant « : ; ! ? », dans les
// nombres (1 500), avant « ₩ » et après « ≈ », pour éviter les retours à la
// ligne disgracieux. S'applique à tous les textes d'un objet.
export function fr<T>(value: T): T {
  if (typeof value === 'string') {
    return value
      .replace(/ ([:;!?»])/g, ' $1')
      .replace(/(«) /g, '$1 ')
      .replace(/(\d) (\d{3})/g, '$1 $2')
      .replace(/ ₩/g, ' ₩')
      .replace(/≈ /g, '≈ ')
      .replace(/(\d) (min|h)\b/g, '$1 $2') as T;
  }
  if (Array.isArray(value)) return value.map(fr) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fr(v)])) as T;
  }
  return value;
}
