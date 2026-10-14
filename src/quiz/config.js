// ─────────────────────────────────────────────────────────────
//  Réglages du quiz (page cachée)
//
//  APPS_SCRIPT_URL : l'adresse de l'application Web Google Apps Script
//  (elle se termine par « /exec »). Voir quiz/SETUP.md, étape 4.
//  Tant qu'elle est vide, les réponses ne sont pas enregistrées en ligne,
//  mais l'écran final affiche quand même le score (comptage manuel possible).
// ─────────────────────────────────────────────────────────────

export const APPS_SCRIPT_URL = '';

// Clé de stockage sur le téléphone (empêche de rejouer).
// Changez-la (ex. '-v2') pour autoriser tout le monde à rejouer après un test.
export const STORAGE_KEY = 'coco-halin-quiz-v1';
