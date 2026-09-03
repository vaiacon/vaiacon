/** Website-Header: vaiacon-Lockup links, lowercase-Nav + Pill-CTA rechts. Beim Scrollen sticky über dem Inhalt. */
export interface SiteHeaderProps {
  /** Pfad zum Logo-Lockup (Standard assets/logo-lockup-terra.png) */
  logoSrc?: string;
  /** Logo-Höhe in px, Standard 56 */
  logoHeight?: number;
  /** lowercase-Labels: [{ label: 'leistungen', href: '#leistungen' }, …] */
  links?: { label: string; href: string }[];
  /** id des aktiven Ankers (Terracotta-Färbung) */
  active?: string;
  /** Standard «erstgespräch» */
  ctaLabel?: string;
  ctaHref?: string;
  /** eigener Klick-Handler für Anker-Navigation */
  onNavigate?: (e: MouseEvent, href: string) => void;
  style?: React.CSSProperties;
}
