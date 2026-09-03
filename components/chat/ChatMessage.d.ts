/** Chat-Bubble im Verlauf: Bot links auf Creme, Nutzer rechts auf Terracotta. In flex-column mit gap 10px stapeln. */
export interface ChatMessageProps {
  /** bot (Standard) · user */
  role?: 'bot' | 'user';
  /** true = Hero-Look mit 1.5px Tinte-Rand; Standard = weicher Widget-Look */
  comic?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
