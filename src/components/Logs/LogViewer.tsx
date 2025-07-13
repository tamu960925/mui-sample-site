import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Paper,
  Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search as SearchIcon } from '@mui/icons-material';
import { LogEntry } from '../../types';
import { LOG_LEVELS } from '../../constants';
import { filterLogsByLevel, filterLogsBySearch } from '../../utils/logUtils';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';


interface LogViewerProps {
  logs: LogEntry[];
  searchQuery: string;
  logLevel: string;
  onSearchChange: (query: string) => void;
  onLogLevelChange: (level: string) => void;
}

const LogViewer: React.FC<LogViewerProps> = ({
  logs,
  searchQuery,
  logLevel,
  onSearchChange,
  onLogLevelChange,
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const filteredLogs = filterLogsBySearch(
    filterLogsByLevel(logs, logLevel),
    searchQuery
  );

  const handleRowClick = (params: any) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(params.id)) {
      newExpandedRows.delete(params.id);
    } else {
      newExpandedRows.add(params.id);
    }
    setExpandedRows(newExpandedRows);
  };

  const getLogLevelChipColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'error';
      case 'WARN':
        return 'warning';
      case 'INFO':
        return 'info';
      case 'DEBUG':
        return 'default';
      default:
        return 'default';
    }
  };

  const getRowHeight = (params: any) => {
    return expandedRows.has(params.id) ? 250 : 52;
  };

  const parseLogMessage = (message: string) => {
    const parsed: any = {
      originalMessage: message,
      ipAddresses: [],
      httpStatus: null,
      duration: null,
      userId: null,
      method: null,
      url: null,
      errorCode: null,
      keywords: []
    };

    // IPアドレスを抽出
    const ipMatches = message.match(/\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/g);
    if (ipMatches) parsed.ipAddresses = ipMatches;

    // HTTPステータスコードを抽出
    const statusMatch = message.match(/\b(200|201|400|401|403|404|500|502|503)\b/);
    if (statusMatch) parsed.httpStatus = statusMatch[0];

    // 実行時間を抽出
    const durationMatch = message.match(/(\d+)ms/);
    if (durationMatch) parsed.duration = durationMatch[0];

    // HTTPメソッドとURLを抽出
    const httpMatch = message.match(/\b(GET|POST|PUT|DELETE|PATCH)\s+([^\s]+)/);
    if (httpMatch) {
      parsed.method = httpMatch[1];
      parsed.url = httpMatch[2];
    }

    // ユーザーIDを抽出
    const userMatch = message.match(/user[:\s]+([^\s,]+)/i);
    if (userMatch) parsed.userId = userMatch[1];

    // エラーコードを抽出
    const errorMatch = message.match(/error[:\s]*([A-Z0-9_]+)/i);
    if (errorMatch) parsed.errorCode = errorMatch[1];

    // キーワード抽出
    const keywords = ['login', 'logout', 'failed', 'success', 'error', 'warning', 'timeout', 'blocked', 'access', 'denied'];
    parsed.keywords = keywords.filter(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );

    return parsed;
  };

  const customColumns = [
    { 
      field: 'expand', 
      headerName: '', 
      width: 50,
      sortable: false,
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {expandedRows.has(params.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
      ),
    },
    { field: 'timestamp', headerName: 'Timestamp', width: 200 },
    { 
      field: 'level', 
      headerName: 'Level', 
      width: 80,
      renderCell: (params: any) => {
        if (expandedRows.has(params.id)) {
          return null;
        }
        return (
          <Chip
            label={params.value}
            color={getLogLevelChipColor(params.value) as any}
            size="small"
          />
        );
      },
    },
    { field: 'source', headerName: 'Source', width: 180 },
    { 
      field: 'message', 
      headerName: 'Message', 
      flex: 1, 
      minWidth: 400,
      renderCell: (params: any) => {
        if (expandedRows.has(params.id)) {
          const parsedData = parseLogMessage(params.row.message);
          return (
            <Box sx={{ p: 2, width: '100%', height: '100%', overflow: 'auto' }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                <Chip
                  label={params.row.level}
                  color={getLogLevelChipColor(params.row.level) as any}
                  size="small"
                />
                <Typography variant="caption" color="text.secondary">
                  ID: {params.row.id}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Source: {params.row.source}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                {parsedData.method && parsedData.url && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">HTTP Request</Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Chip label={parsedData.method} size="small" color="primary" variant="outlined" />
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        {parsedData.url}
                      </Typography>
                    </Box>
                  </Box>
                )}
                
                {parsedData.httpStatus && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">Status Code</Typography>
                    <Chip 
                      label={parsedData.httpStatus} 
                      size="small" 
                      color={parsedData.httpStatus.startsWith('2') ? 'success' : 'error'} 
                    />
                  </Box>
                )}
                
                {parsedData.duration && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">Duration</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {parsedData.duration}
                    </Typography>
                  </Box>
                )}
                
                {parsedData.userId && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">User ID</Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {parsedData.userId}
                    </Typography>
                  </Box>
                )}
              </Box>

              {parsedData.ipAddresses.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">IP Addresses</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {parsedData.ipAddresses.map((ip: string, index: number) => (
                      <Chip key={index} label={ip} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}

              {parsedData.keywords.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">Keywords</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {parsedData.keywords.map((keyword: string, index: number) => (
                      <Chip 
                        key={index} 
                        label={keyword} 
                        size="small" 
                        color={keyword === 'error' || keyword === 'failed' ? 'error' : 'default'} 
                        variant="outlined" 
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {parsedData.errorCode && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">Error Code</Typography>
                  <Chip label={parsedData.errorCode} size="small" color="error" />
                </Box>
              )}
              
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Original Message
              </Typography>
              <Paper 
                sx={{ 
                  p: 1.5, 
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  maxHeight: 80,
                  overflow: 'auto'
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: '0.75rem'
                  }}
                >
                  {parsedData.originalMessage}
                </Typography>
              </Paper>
            </Box>
          );
        }
        return (
          <Typography 
            variant="body2" 
            sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h4" gutterBottom>
        ログビューア
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="検索"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>ログレベル</InputLabel>
          <Select
            value={logLevel}
            label="ログレベル"
            onChange={(e) => onLogLevelChange(e.target.value)}
          >
            <MenuItem value="">すべて</MenuItem>
            {LOG_LEVELS.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Paper sx={{ height: 'calc(100vh - 280px)', width: '100%', minHeight: 600 }}>
        <DataGrid
          rows={filteredLogs}
          columns={customColumns}
          pageSizeOptions={[25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
          getRowHeight={getRowHeight}
          sx={{
            '& .MuiDataGrid-row': {
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            },
            '& .MuiDataGrid-cell': {
              fontSize: '0.875rem',
              lineHeight: 1.4,
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              fontSize: '0.875rem',
              fontWeight: 600,
            },
          }}
        />
      </Paper>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {filteredLogs.length} / {logs.length} 件のログを表示
      </Typography>
    </Box>
  );
};

export default LogViewer;