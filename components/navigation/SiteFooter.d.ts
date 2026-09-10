/** Schlanker One-Line-Footer auf radialem Terra-Glow — weisses Lockup, Adresse, «↑ nach oben». */
export interface SiteFooterProps {
  /** Pfad zum weissen Lockup (Standard assets/logo-lockup-white.png) */
  logoSrc?: string;
  /** Logo-Höhe in px, Standard 24 */
  logoHeight?: number;
  /** Standard «vaiacon GmbH · Lehenstrasse 74, 8037 Zürich» */
  address?: string;
  email?: string;
  copyright?: string;
  /** Link zur Seite «Datenschutz und Impressum»; ohne Angabe kein Link */
  legalHref?: string;
  /** Standard «Datenschutz und Impressum» */
  legalLabel?: string;
  /** Klick-Handler für «nach oben» */
  onTop?: (e: MouseEvent) => void;
  style?: React.CSSProperties;
}
