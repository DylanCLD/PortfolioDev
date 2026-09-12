import type { Metadata } from "next"
import { LegalShell } from "@/components/legal-shell"
export const metadata: Metadata = { title: "Conditions d’utilisation", alternates: { canonical: "/conditions-utilisation" } }

export default function Page() {
  return <LegalShell title="Conditions d’utilisation">
    <section><h2>Objet et accès</h2><p>Ce site permet de découvrir le parcours, les compétences et les projets de Dylan Clochard, puis de le contacter. La consultation est gratuite, sans inscription. Les frais de connexion restent ceux de votre opérateur. Il ne s’agit pas d’une boutique ni d’un service contractuel de développement.</p></section>
    <section><h2>Utilisation du site</h2><p>Vous pouvez consulter les contenus et ouvrir les liens proposés. N’utilisez pas le site pour diffuser des messages illicites, porter atteinte aux droits de tiers ou perturber son fonctionnement. Les usages permis par la loi, notamment les exceptions au droit d’auteur, restent applicables.</p></section>
    <section><h2>Projets et liens externes</h2><p>Les captures illustrent un état des projets ; leurs fonctionnalités peuvent évoluer. Les sites externes et leurs disponibilités dépendent de leurs éditeurs. La mise en relation par e-mail ne constitue pas, à elle seule, un engagement d’embauche ou de prestation.</p></section>
    <section><h2>Disponibilité et corrections</h2><p>Le site peut être interrompu pour maintenance ou en cas d’incident. Malgré le soin apporté aux informations, une erreur peut subsister : signalez-la par e-mail. Aucune clause de cette page n’écarte une responsabilité ou un droit auquel la loi interdit de déroger.</p></section>
    <section><h2>Données et droits sur les contenus</h2><p>Les modalités de traitement des données figurent dans la <a href="/confidentialite">politique de confidentialité</a>. Les informations sur l’éditeur et les droits sur les contenus figurent dans les <a href="/mentions-legales">mentions légales</a>.</p></section>
    <section><h2>Droit applicable</h2><p>Le droit français s’applique, sous réserve des dispositions impératives éventuellement applicables. En cas de difficulté, un échange amiable peut être proposé à <a href="mailto:dylanclochard@gmail.com">dylanclochard@gmail.com</a>. Les règles légales de compétence juridictionnelle restent applicables.</p></section>
  </LegalShell>
}
