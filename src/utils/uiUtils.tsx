import React from 'react';
import { LogLevel, AlertStatus } from '../types';
import {
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

export const getLogLevelIcon = (level: LogLevel): React.ReactElement => {
  switch (level) {
    case 'ERROR':
    case 'FATAL':
      return <ErrorIcon color="error" />;
    case 'WARN':
      return <WarningIcon color="warning" />;
    case 'INFO':
      return <InfoIcon color="info" />;
    case 'DEBUG':
    case 'TRACE':
      return <InfoIcon color="disabled" />;
    default:
      return <InfoIcon />;
  }
};

export const getLogLevelColor = (level: LogLevel): 'error' | 'warning' | 'info' | 'default' => {
  switch (level) {
    case 'ERROR':
    case 'FATAL':
      return 'error';
    case 'WARN':
      return 'warning';
    case 'INFO':
      return 'info';
    case 'DEBUG':
    case 'TRACE':
      return 'default';
    default:
      return 'default';
  }
};

export const getStatusColor = (status: AlertStatus): 'error' | 'warning' | 'success' | 'default' => {
  switch (status) {
    case 'open':
      return 'error';
    case 'investigating':
      return 'warning';
    case 'resolved':
      return 'success';
    case 'closed':
      return 'default';
    default:
      return 'default';
  }
};