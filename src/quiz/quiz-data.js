// ─────────────────────────────────────────────────────────────
//  Questions du quiz
//
//  Deux types de questions :
//
//  1) Choix multiple (4 propositions) :
//     {
//       type: 'choix',
//       question: 'Texte de la question',
//       photo: '/quiz-photos/ma-photo.jpg',   ← facultatif (fichier dans public/quiz-photos/)
//       choix: ['A', 'B', 'C', 'D'],
//       reponse: 2,                           ← numéro de la bonne réponse (1 = la première)
//     }
//
//  2) Réponse en chiffres :
//     {
//       type: 'nombre',
//       question: 'Texte de la question',
//       reponse: 2019,                        ← la bonne réponse
//       tolerance: 0,                         ← facultatif : écart accepté (ex. 1 → 2018 à 2020 acceptés)
//       unite: 'ans',                         ← facultatif : affiché à côté de la case
//     }
//
//  Pour retirer une photo, supprimez simplement la ligne « photo ».
//  Vous pouvez ajouter ou retirer autant de questions que vous voulez.
// ─────────────────────────────────────────────────────────────

export const quiz = {
  titre: 'Notre petit quiz',
  intro: 'Que savez-vous vraiment de nous ? Prenez votre temps, il n’y a pas de chrono. Les meilleurs scores gagnent un petit cadeau !',

  questions: [
    {
      type: 'choix',
      question: 'Où Corentin et Halin se sont-ils rencontrés ?',
      choix: ['À Paris', 'À Séoul', 'À Londres', 'À Tokyo'],
      reponse: 1,
    },
    {
      type: 'nombre',
      question: 'En quelle année se sont-ils rencontrés ?',
      reponse: 2019,
    },
    {
      type: 'choix',
      question: 'Où a été prise cette photo ?',
      photo: '/quiz-photos/exemple.jpg',
      choix: ['Au bord de la Seine', 'Sur le fleuve Han', 'À Venise', 'À Amsterdam'],
      reponse: 1,
    },
    {
      type: 'nombre',
      question: 'Combien de pays ont-ils visités ensemble ?',
      reponse: 8,
      tolerance: 1,
      unite: 'pays',
    },
    {
      type: 'choix',
      question: 'Qui a fait la demande en mariage ?',
      choix: ['Corentin', 'Halin', 'Les deux en même temps', 'Leur chat'],
      reponse: 1,
    },
  ],
};
