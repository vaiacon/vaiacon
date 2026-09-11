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
  /** Verweis auf die AGB; ohne Angabe kein Link */
  agbHref?: string;
  /** Standard «AGB» */
  agbLabel?: string;
  /** Verweis auf das Facebook-Profil; ohne Angabe kein Zeichen */
  facebookHref?: string;
  /** Verweis auf das Instagram-Profil; ohne Angabe kein Zeichen */
  instagramHref?: string;
  /** Verweis auf das LinkedIn-Profil; ohne Angabe kein Zeichen */
  linkedinHref?: string;
  /** Klick-Handler für «nach oben» */
  onTop?: (e: MouseEvent) => void;
  style?: React.CSSProperties;
}
