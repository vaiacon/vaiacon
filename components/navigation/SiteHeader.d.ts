/** Website-Header: vaiacon-Lockup links, Nav + Pill-CTA rechts. Beim Scrollen sticky über dem Inhalt. */
export interface SiteHeaderProps {
  /** Pfad zum Logo-Lockup (Standard assets/logo-lockup-terra.png) */
  logoSrc?: string;
  /** Logo-Höhe in px, Standard 56 */
  logoHeight?: number;
  /** Labels beginnen gross: [{ label: 'Visibility', href: 'visibility.html' }, …] */
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
