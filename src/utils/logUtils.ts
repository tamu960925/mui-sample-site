import { LogEntry, LogStats, LogLevel } from '../types';
import { REGEX_PATTERNS } from '../constants';

export const parseLogFile = (content: string, filename: string): LogEntry[] => {
  const lines = content.split('\n').filter(line => line.trim());
  const logs: LogEntry[] = [];
  
  lines.forEach((line, index) => {
    const timestampMatch = line.match(REGEX_PATTERNS.TIMESTAMP);
    const levelMatch = line.match(REGEX_PATTERNS.LOG_LEVEL);
    const ipMatch = line.match(REGEX_PATTERNS.IP_ADDRESS);
    const statusMatch = line.match(REGEX_PATTERNS.HTTP_STATUS);
    
    logs.push({
      id: `${filename}_${index}`,
      timestamp: timestampMatch ? timestampMatch[1] : new Date().toISOString(),
      level: levelMatch ? (levelMatch[1].toUpperCase() as LogLevel) : 'INFO',
      message: line,
      source: filename,
      ip: ipMatch ? ipMatch[1] : undefined,
      status: statusMatch ? parseInt(statusMatch[1]) : undefined,
      raw: line
    });
  });
  
  return logs;
};

export const generateLogStats = (logs: LogEntry[]): LogStats => {
  const stats: LogStats = {
    totalLogs: logs.length,
    errorCount: logs.filter(log => log.level === 'ERROR').length,
    warnCount: logs.filter(log => log.level === 'WARN').length,
    infoCount: logs.filter(log => log.level === 'INFO').length,
    debugCount: logs.filter(log => log.level === 'DEBUG').length,
    uniqueIPs: Array.from(new Set(logs.filter(log => log.ip).map(log => log.ip))).length,
    statusCodes: {},
    topErrors: []
  };
  
  // ステータスコード統計
  logs.forEach(log => {
    if (log.status) {
      stats.statusCodes[log.status] = (stats.statusCodes[log.status] || 0) + 1;
    }
  });
  
  return stats;
};

export const filterLogsByLevel = (logs: LogEntry[], level: string): LogEntry[] => {
  if (!level) return logs;
  return logs.filter(log => log.level === level);
};

export const filterLogsBySearch = (logs: LogEntry[], query: string): LogEntry[] => {
  if (!query) return logs;
  const lowerQuery = query.toLowerCase();
  return logs.filter(log => 
    log.message.toLowerCase().includes(lowerQuery) ||
    log.source.toLowerCase().includes(lowerQuery)
  );
};