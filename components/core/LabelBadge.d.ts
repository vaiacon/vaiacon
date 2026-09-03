/** Gesperrtes UPPERCASE-Mini-Badge in Pill-Form («KOSTENLOS & UNVERBINDLICH»). */
export interface LabelBadgeProps {
  /** peach auf hellen Karten (Standard) · onTerra auf Terracotta-Verlauf · onDark auf #171210 */
  tone?: 'peach' | 'onTerra' | 'onDark';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
