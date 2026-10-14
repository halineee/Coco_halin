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
//       aide: 'petite précision',             ← facultatif : affichée sous la question
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
  intro: 'Que savez-vous vraiment de Coco (Corentin) et Halin ? Prenez votre temps, il n’y a pas de chrono. Les meilleurs scores gagnent un petit cadeau !',

  // Dernier écran avant l'envoi : un petit mot pour les mariés (facultatif, sans points)
  message: {
    titre: 'Un petit mot pour nous ?',
    texte: 'Un souhait, un conseil, un souvenir… Nous les lirons tous avec émotion.',
  },

  questions: [
    {
      type: 'choix',
      question: 'Quand nous sommes-nous rencontrés ?',
      choix: ['En juin 2019', 'En février 2018', 'En avril 2019', 'En mai 2018'],
      reponse: 3,
    },
    {
      type: 'choix',
      question: 'Où a eu lieu notre premier rendez-vous ?',
      choix: ['Au bord d’un lac', 'Au restaurant', 'Dans une cathédrale', 'En boîte de nuit'],
      reponse: 3,
    },
    {
      type: 'choix',
      question: 'Qu’est-ce qui a fait craquer Coco en premier chez Halin ?',
      choix: ['Son petit nez', 'Son joli sourire', 'Sa grande taille', 'Elle nage très bien'],
      reponse: 2,
    },
    {
      type: 'choix',
      question: 'Et qu’est-ce qui a fait craquer Halin en premier chez Coco ?',
      choix: ['Il l’a invitée dans un restaurant très cher', 'Il connaissait bien la Corée', 'Il était beau', 'Son humour irrésistible'],
      reponse: 3,
    },
    {
      type: 'choix',
      question: 'Quel est le tout premier repas que Coco a offert à Halin ?',
      choix: ['Des ramen', 'Un steak', 'Un burger', 'Un jarret de porc à l’allemande'],
      reponse: 2,
    },
    {
      type: 'choix',
      question: 'Notre premier voyage ensemble en France, c’était où ?',
      choix: ['Paris', 'Narbonne', 'Cassis', 'Lyon'],
      reponse: 1,
    },
    {
      type: 'nombre',
      question: 'Dans combien de pays avons-nous voyagé ensemble ?',
      aide: 'Sans compter la France !',
      reponse: 6,
      unite: 'pays',
    },
    {
      type: 'choix',
      question: 'Lequel de ces surnoms Coco ne donne-t-il PAS à Halin ?',
      choix: ['Ange de la mort', 'Petit pied', 'Tour de France', 'Mon citron'],
      reponse: 4,
    },
    {
      type: 'choix',
      question: 'Pendant nos années à distance, qu’est-ce que nous n’avons JAMAIS fait au téléphone ?',
      choix: ['Trinquer ensemble', 'S’endormir en ligne', 'Regarder une série en même temps', 'Se réveiller l’un l’autre le matin'],
      reponse: 1,
    },
    {
      type: 'nombre',
      question: 'Combien de kilomètres séparent Séoul de Paris ?',
      aide: 'À vol d’oiseau. À 1 000 km près, c’est gagné !',
      reponse: 9000,
      tolerance: 1000,
      unite: 'km',
    },
    // ── Photo de bébés : à activer quand la photo est prête ──
    //   1) déposez la photo dans public/quiz-photos/bebes.jpg
    //   2) indiquez le bon numéro dans « reponse »
    //   3) retirez les « // » au début des 6 lignes ci-dessous
    // {
    //   type: 'choix',
    //   question: 'Lequel de ces bébés est Halin ?',
    //   photo: '/quiz-photos/bebes.jpg',
    //   choix: ['Le bébé n° 1', 'Le bébé n° 2', 'Le bébé n° 3', 'Le bébé n° 4'],
    //   reponse: 1,
    // },
    {
      type: 'nombre',
      question: 'En 2019, quel mois Halin a-t-elle rencontré les parents de Coco pour la première fois ?',
      aide: 'Le numéro du mois, de 1 à 12',
      reponse: 8,
      unite: 'e mois',
    },
    {
      type: 'choix',
      question: 'Laquelle de ces choses Halin a-t-elle déjà faite pour Coco ?',
      choix: ['Recoudre un caleçon troué', 'Lui ouvrir un pot de confiture', 'Lui épiler des poils du visage', 'Lui laver le visage'],
      reponse: 3,
    },
    {
      type: 'choix',
      question: 'Où a eu lieu la demande en mariage ?',
      choix: ['En Norvège', 'À Paris', 'En Islande', 'À Séoul'],
      reponse: 3,
    },
    {
      type: 'choix',
      question: 'Quelle a été la phrase de Coco pour sa demande en mariage ?',
      choix: ['« Il fait beau, alors… »', '« Je t’aime. »', '« Veux-tu m’épouser ? »', '« Fais-moi un bébé ! »'],
      reponse: 1,
    },
    {
      type: 'choix',
      question: 'Lequel de ces plats Coco n’a-t-il JAMAIS cuisiné pour Halin ?',
      choix: ['Un riz sauté au kimchi', 'Le « Coco-bang »', 'Un poulet aux olives', 'Un kimchi jjigae'],
      reponse: 4,
    },
    {
      type: 'nombre',
      question: 'Depuis combien de mois Bami partage-t-il notre vie ?',
      reponse: 7,
      unite: 'mois',
    },
    {
      type: 'choix',
      question: 'Quel est le cadeau de Coco que Halin préfère ?',
      choix: ['Un sac de luxe', 'La bague de fiançailles', 'Un collier', 'Un bouquet de fleurs'],
      reponse: 3,
    },
    {
      type: 'choix',
      question: 'Et pour finir : quelle est la date de notre mariage en Corée ?',
      choix: ['Le 15 août 2027', 'Le 14 août 2027', 'Le 17 août 2027', 'Le 21 août 2027'],
      reponse: 2,
    },
  ],
};
