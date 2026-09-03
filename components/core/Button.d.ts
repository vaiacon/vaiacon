/**
 * Pill-Button der Marke. Beschriftung lowercase («erstgespräch»), Pfeil-Glyph als Suffix.
 */
export interface ButtonProps {
  /** cta = Orange #E2652C (Standard) · light = Creme auf Terra · glass = transluzent auf Terra/Dunkel · dark = Tinte, Hover Terra */
  variant?: 'cta' | 'light' | 'glass' | 'dark';
  /** sm 14.5px · md 17px (Standard) · lg 18px (Nav-CTA) */
  size?: 'sm' | 'md' | 'lg';
  /** true = «→»; oder eigenes Glyph («↗», «↑») */
  arrow?: boolean | string;
  /** rendert <a> statt <button> */
  href?: string;
  target?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
