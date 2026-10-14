/** Nummerierter UPPERCASE-Kicker über Sektionstiteln («01 — WOFÜR WIR STEHEN»). */
export interface KickerProps {
  /** zweistellig als String: «01», «02» … ohne Nummer für freie Eyebrows */
  number?: string;
  /** terra auf hell (Standard) · onTerra = Peach-Weiss · onDark = Orange #D26336 */
  tone?: 'terra' | 'onTerra' | 'onDark';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
