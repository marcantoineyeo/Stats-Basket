# Stats Basket – mise en ligne (≈ 15 min, gratuit)

L'appli se compose de deux briques :
- **GitHub Pages** héberge l'appli, comme QG Emploi. On l'ouvre par un lien et on l'installe sur l'écran d'accueil.
- **Firebase** (Google, offre gratuite) stocke les stats et les synchronise en direct entre tous les téléphones. Personne n'a besoin de créer de compte.

---

## 1. Créer la base Firebase (≈ 8 min)

1. Va sur https://console.firebase.google.com et connecte-toi avec ton compte Google.
2. **Créer un projet** → nom : `stats-basket` → désactive Google Analytics (inutile) → Créer.
3. **Ajouter l'appli web** : sur l'accueil du projet, clique l'icône **`</>`** (Web) → surnom `Stats Basket` → ne coche pas « Hosting » → Enregistrer.
   Firebase affiche un bloc `const firebaseConfig = { apiKey: ..., authDomain: ..., ... }`.
   👉 **Copie ces valeurs dans `config.js`**, à la place des valeurs d'exemple.
4. **Activer la connexion anonyme** : menu de gauche **Créer → Authentication** → Commencer → onglet **Mode de connexion** → **Anonyme** → Activer → Enregistrer.
5. **Créer la base** : **Créer → Firestore Database** → Créer une base de données → emplacement **`eur3 (europe-west)`** → **mode production** → Créer.
6. **Coller les règles de sécurité** : dans Firestore, onglet **Règles** → remplace tout par le contenu du fichier `firestore.rules` → **Publier**.

> La clé `apiKey` de `config.js` n'est pas un mot de passe : elle est faite pour être publique. Ce qui protège les données, ce sont les règles de l'étape 6 et le code équipe.

## 2. Mettre l'appli en ligne sur GitHub Pages (≈ 5 min)

1. Sur GitHub, **New repository** → nom `Stats-Basket` → **Public** → Create.
2. **Add file → Upload files** → glisse **tous les fichiers du dossier** (index.html, config.js, sw.js, manifest.webmanifest, les 4 icônes .png, firestore.rules, README.md) → Commit.
3. **Settings → Pages** → Source : **Deploy from a branch** → Branch **main** / **(root)** → Save.
4. Une à deux minutes plus tard, l'appli est en ligne sur :
   **https://marcantoineyeo.github.io/Stats-Basket/**

## 3. Première utilisation

1. Ouvre le lien sur ton téléphone → **Créer une nouvelle équipe** → donne le nom.
2. L'appli génère un **code équipe** (ex. `LILLEBC-7KQ2PX`) et te propose le **lien d'invitation**.
3. Envoie ce lien au staff et aux joueurs (WhatsApp…). En l'ouvrant, ils rejoignent directement l'équipe.
4. Chacun l'installe sur son écran d'accueil :
   - **iPhone** : ouvre le lien dans **Safari** → bouton Partager → « Sur l'écran d'accueil ».
   - **Android** : Chrome → menu ⋮ → « Installer l'application ».
   - Le chemin est aussi rappelé dans l'appli : **Effectif → Installer sur le téléphone**.

## Bon à savoir

- **Un seul marqueur par match.** Si deux personnes saisissent le même match en même temps, la dernière sauvegarde écrase l'autre. Les autres peuvent suivre le match en direct sans rien toucher.
- **Sans réseau au gymnase**, la saisie continue : tout est sauvé sur le téléphone et se synchronise au retour du réseau. L'appli s'ouvre même hors-ligne une fois installée.
- **Le code équipe donne un accès complet** : lecture et modification. Ne le partage qu'avec l'équipe et le staff.
- **Coût** : l'offre gratuite de Firebase (Spark) couvre très largement une équipe (50 000 lectures et 20 000 écritures par jour).
- **Mettre à jour l'appli** : remplace `index.html` sur GitHub. Les téléphones récupèrent la nouvelle version à la prochaine ouverture avec du réseau. Ne remplace jamais ton `config.js` rempli par celui d'exemple.
