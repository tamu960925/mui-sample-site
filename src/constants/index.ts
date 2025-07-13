import { LogLevel, SecurityMetric, ThreatDataPoint, LogSourceData, Alert, MenuItem } from '../types';
import React from 'react';
import {
  UploadFile as UploadFileIcon,
  Analytics as AnalyticsIcon,
  Search as SearchIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

export const DRAWER_WIDTH = 240;

export const LOG_LEVELS: LogLevel[] = ['ERROR', 'WARN', 'INFO', 'DEBUG'];

export const SECURITY_METRICS: SecurityMetric[] = [
  { name: '脅威検知', value: 24, trend: 'up', color: '#f44336' },
  { name: 'ブロック済み攻撃', value: 156, trend: 'down', color: '#4caf50' },
  { name: 'アクティブセッション', value: 1247, trend: 'up', color: '#2196f3' },
  { name: 'システム稼働率', value: 99.8, trend: 'stable', color: '#4caf50' },
];

export const THREAT_DATA: ThreatDataPoint[] = [
  { time: '00:00', threats: 12, blocked: 45 },
  { time: '04:00', threats: 8, blocked: 32 },
  { time: '08:00', threats: 24, blocked: 67 },
  { time: '12:00', threats: 18, blocked: 54 },
  { time: '16:00', threats: 32, blocked: 89 },
  { time: '20:00', threats: 28, blocked: 76 },
];

export const LOG_SOURCE_DATA: LogSourceData[] = [
  { id: 0, value: 35, label: 'Web Server' },
  { id: 1, value: 25, label: 'Database' },
  { id: 2, value: 20, label: 'Application' },
  { id: 3, value: 20, label: 'Network' },
];

export const SAMPLE_ALERTS: Alert[] = [
  { 
    id: 1, 
    timestamp: '2024-01-13 15:30:24', 
    level: 'ERROR', 
    source: 'web-server-01', 
    message: 'Suspicious login attempt from IP 192.168.1.100',
    status: 'open'
  },
  { 
    id: 2, 
    timestamp: '2024-01-13 15:28:12', 
    level: 'WARN', 
    source: 'database-01', 
    message: 'High memory usage detected (85%)',
    status: 'investigating'
  },
  { 
    id: 3, 
    timestamp: '2024-01-13 15:25:45', 
    level: 'ERROR', 
    source: 'app-server-02', 
    message: 'SQL injection attempt blocked',
    status: 'resolved'
  },
  { 
    id: 4, 
    timestamp: '2024-01-13 15:22:33', 
    level: 'INFO', 
    source: 'firewall-01', 
    message: 'Connection established from authorized IP',
    status: 'closed'
  },
  { 
    id: 5, 
    timestamp: '2024-01-13 15:20:11', 
    level: 'WARN', 
    source: 'web-server-02', 
    message: 'Rate limit exceeded for user session',
    status: 'open'
  },
];

export const SAMPLE_LOG_ENTRIES = [
  { id: 1, timestamp: '2024-01-13 15:30:24', level: 'ERROR' as LogLevel, source: 'auth-service', message: 'Failed login attempt for user admin from 192.168.1.100' },
  { id: 2, timestamp: '2024-01-13 15:30:22', level: 'INFO' as LogLevel, source: 'web-server', message: 'GET /api/users 200 45ms' },
  { id: 3, timestamp: '2024-01-13 15:30:20', level: 'WARN' as LogLevel, source: 'database', message: 'Query execution time exceeded threshold: 1200ms' },
  { id: 4, timestamp: '2024-01-13 15:30:18', level: 'DEBUG' as LogLevel, source: 'cache-service', message: 'Cache miss for key: user_session_abc123' },
  { id: 5, timestamp: '2024-01-13 15:30:16', level: 'ERROR' as LogLevel, source: 'payment-service', message: 'Payment processing failed: insufficient funds' },
  { id: 6, timestamp: '2024-01-13 15:30:14', level: 'INFO' as LogLevel, source: 'notification-service', message: 'Email notification sent to user@example.com' },
  { id: 7, timestamp: '2024-01-13 15:30:12', level: 'WARN' as LogLevel, source: 'api-gateway', message: 'Rate limit approaching for client ID: client_123' },
  { id: 8, timestamp: '2024-01-13 15:30:10', level: 'INFO' as LogLevel, source: 'user-service', message: 'User profile updated successfully for user ID: 12345' },
];

export const MENU_ITEMS: MenuItem[] = [
  { text: 'ファイルアップロード', icon: React.createElement(UploadFileIcon), id: 'upload' },
  { text: '解析結果', icon: React.createElement(AnalyticsIcon), id: 'analysis' },
  { text: 'ログビューア', icon: React.createElement(SearchIcon), id: 'logs' },
  { text: 'レポート', icon: React.createElement(AssessmentIcon), id: 'reports' },
  { text: '設定', icon: React.createElement(SettingsIcon), id: 'settings' },
];

export const LOG_GRID_COLUMNS = [
  { field: 'timestamp', headerName: 'Timestamp', width: 180 },
  { field: 'level', headerName: 'Level', width: 100 },
  { field: 'source', headerName: 'Source', width: 150 },
  { field: 'message', headerName: 'Message', width: 500, flex: 1 },
];

export const REGEX_PATTERNS = {
  TIMESTAMP: /(\d{4}-\d{2}-\d{2}[\s_T]\d{2}:\d{2}:\d{2})/,
  LOG_LEVEL: /\b(ERROR|WARN|INFO|DEBUG|TRACE|FATAL)\b/i,
  IP_ADDRESS: /\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/,
  HTTP_STATUS: /\b(200|201|400|401|403|404|500|502|503)\b/,
};