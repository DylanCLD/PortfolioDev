# Vérification de confidentialité — 12 septembre 2026

Périmètre : portfolio personnel sans vente, compte ou formulaire. Dylan confirme ne pas utiliser de statistiques de visiteurs. Cette revue du code ne certifie pas l'ensemble de la conformité juridique ni les paramètres du compte d'hébergement.

## Vérifié et mis en place

- Dépendance Analytics retirée ; aucun composant de suivi actif trouvé dans le site.
- Les 11 captures de projets sont servies depuis `public/projects` ; pas d'appel navigateur au stockage Blob tiers.
- Les polices `next/font` sont servies localement à l'exécution.
- Seule préférence persistée par le parcours actif : `localStorage.language`, valeur `fr` ou `en`, au changement de langue. Lecture protégée si le stockage est bloqué. Pas de cookie publicitaire.
- Contact par mailto/tel ; pas de base de messages sur le site. Information et lien vers les droits au point de contact.
- Mentions légales, confidentialité, conditions d'utilisation accessibles depuis le pied de page.
- Pas de promesse de certification RGPD ni de bannière de consentement artificielle.

## À confirmer avant publication

1. L'hébergeur doit disposer des éléments d'identification personnelle exigés pour l'éditeur non professionnel. L'adresse privée de Dylan n'a pas été inventée ni publiée.
2. Vérifier dans le compte que Web Analytics, Speed Insights, log drains et scripts injectés ne sont pas activés au-delà du périmètre décrit. Documenter les catégories et durées exactes des journaux du plan utilisé et préciser la politique de confidentialité en conséquence.
3. La durée de 12 mois après dernier échange est une politique proposée pour les e-mails de contact : organiser réellement le tri/suppression, y compris pièces jointes et corbeille, sous réserve des exceptions documentées. Rien n'a été supprimé de Gmail par cette tâche.
4. Vérifier les conditions du compte Gmail utilisé, les destinataires, les garanties de transferts internationaux applicables et le DPA de l'hébergement. Une simple page légale ne réalise pas ces démarches.
5. Sécuriser les comptes hébergement/GitHub/messagerie avec MFA et accès limités. Traiter les demandes de droits sous un mois, consigner les demandes, vérifier l'identité seulement si nécessaire. Évaluer et notifier les violations dans les conditions du RGPD.
6. Vérifier les droits de diffusion des captures, marques et projets collaboratifs. Les crédits/licences de composants et dépendances doivent rester respectés.
7. L'URL publique actuelle est dylan-clochard.vercel.app. Pour enlever la marque du domaine, connecter un domaine personnel et définir NEXT_PUBLIC_SITE_URL. Ne pas annoncer un domaine non détenu.
8. Après déploiement autorisé : vérifier HTTPS, ressources/réseau réels, stockage, en-têtes, métadonnées et absence de suivi sur le domaine public. Aucun déploiement n'a été effectué ici.

## Références consultées

- LCEN, article 1-1 : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000049568614
- CNIL, information et transparence : https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence
- CNIL, cookies : https://cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/comment-mettre-mon-site-web-en-conformite
- Vercel, identité/adresse : https://vercel.com/legal/privacy-notice ; téléphone publié dans https://vercel.com/legal/dmca-policy
- Vercel, sous-traitance : https://vercel.com/legal/dpa

Les coordonnées de l'hébergeur sont une information légale, pas une signature promotionnelle. Les détails techniques du fournisseur dans les paquets Next.js ou les en-têtes réseau ne peuvent pas être éliminés honnêtement tout en conservant cet hébergement.

## Mise à jour vidéos Roblox
Lecteurs YouTube intégrés sur youtube-nocookie.com uniquement après autorisation explicite dans la galerie. Aucun iframe ou thumbnail distant avant ce choix. Autorisation en mémoire, réinitialisée à la fermeture/changement de projet ; bouton de désactivation et alternative captures locales. La politique publique décrit Google et le retrait. La nouvelle galerie Anime Treasure Simulator comprend 7 captures locales (game1 + Map1), le moteur de donjons 2.
