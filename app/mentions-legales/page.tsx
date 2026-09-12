import type { Metadata } from "next"
import { LegalShell } from "@/components/legal-shell"
export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } }

export default function Page() {
  return <LegalShell title="Mentions légales">
    <section><h2>Éditeur et publication</h2><p>Ce portfolio personnel est édité à titre non professionnel par Dylan Clochard, responsable de la publication. Il présente son parcours et ses réalisations dans le cadre de sa recherche d’alternance. Il ne propose ni vente ni paiement en ligne.</p><p>Contact : <a href="mailto:dylanclochard@gmail.com">dylanclochard@gmail.com</a> · <a href="tel:+33783611209">+33 7 83 61 12 09</a>.</p><p>Conformément au régime applicable aux éditeurs non professionnels, les coordonnées personnelles non publiées sont à communiquer à l’hébergeur.</p></section>
    <section><h2>Hébergement</h2><p>Vercel Inc. — 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.</p><p>Téléphone publié par l’hébergeur : +1 559 288 7060. Site : <a href="https://vercel.com/legal/privacy-notice">vercel.com</a>.</p></section>
    <section><h2>Propriété intellectuelle</h2><p>Les textes et créations originales sont protégés par le droit d’auteur. Les marques, univers de jeux, captures et ressources de tiers appartiennent à leurs titulaires respectifs. Leur présentation ne signifie pas que ces titulaires soutiennent ce portfolio.</p><p>Les projets collaboratifs et le code accessible publiquement restent soumis aux droits de leurs auteurs et aux licences indiquées dans leurs dépôts. Pour une réutilisation non couverte par ces licences ou par la loi, contactez le titulaire des droits.</p></section>
    <section><h2>Signaler un problème</h2><p>Pour demander une correction, signaler un contenu ou exercer un droit de réponse, écrivez à l’adresse de contact en précisant la page concernée et l’objet de votre demande.</p></section>
  </LegalShell>
}
