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
    return expandedRows.has(params.id) ? 200 : 52;
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
          return (
            <Box sx={{ p: 2, width: '100%', height: '100%' }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                <Chip
                  label={params.row.level}
                  color={getLogLevelChipColor(params.row.level) as any}
                  size="small"
                />
                <Typography variant="caption" color="text.secondary">
                  ID: {params.row.id}
                </Typography>
              </Box>
              
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                詳細メッセージ
              </Typography>
              <Paper 
                sx={{ 
                  p: 1.5, 
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  maxHeight: 120,
                  overflow: 'auto'
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}
                >
                  {params.row.message}
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
          getRowClassName={(params) => `log-level-${params.row.level?.toLowerCase()}`}
          sx={{
            '& .MuiDataGrid-row': {
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'action.hover',
              },
              '&.log-level-error': {
                backgroundColor: '#ffebee',
                '&:hover': {
                  backgroundColor: '#ffcdd2',
                },
              },
              '&.log-level-warn': {
                backgroundColor: '#fff3e0',
                '&:hover': {
                  backgroundColor: '#ffe0b2',
                },
              },
              '&.log-level-info': {
                backgroundColor: '#e3f2fd',
                '&:hover': {
                  backgroundColor: '#bbdefb',
                },
              },
              '&.log-level-debug': {
                backgroundColor: '#f3e5f5',
                '&:hover': {
                  backgroundColor: '#e1bee7',
                },
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