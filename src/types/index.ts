export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  source: string;
  ip?: string;
  status?: number;
  raw: string;
}

export interface LogStats {
  totalLogs: number;
  errorCount: number;
  warnCount: number;
  infoCount: number;
  debugCount: number;
  uniqueIPs: number;
  statusCodes: Record<string, number>;
  topErrors: string[];
}

export interface SecurityMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

export interface ThreatDataPoint {
  time: string;
  threats: number;
  blocked: number;
}

export interface LogSourceData {
  id: number;
  value: number;
  label: string;
}

export interface Alert {
  id: number;
  timestamp: string;
  level: LogLevel;
  source: string;
  message: string;
  status: AlertStatus;
}

export interface MenuItem {
  text: string;
  icon: React.ReactNode;
  id: string;
}

export type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE' | 'FATAL';
export type AlertStatus = 'open' | 'investigating' | 'resolved' | 'closed';
export type PageId = 'upload' | 'analysis' | 'logs' | 'reports' | 'settings';