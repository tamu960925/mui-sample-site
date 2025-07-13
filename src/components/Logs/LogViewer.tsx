import React from 'react';
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
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search as SearchIcon } from '@mui/icons-material';
import { LogEntry } from '../../types';
import { LOG_GRID_COLUMNS, LOG_LEVELS } from '../../constants';
import { filterLogsByLevel, filterLogsBySearch } from '../../utils/logUtils';

const getLogLevelColor = (level: string) => {
  switch (level) {
    case 'ERROR':
      return '#ffebee';
    case 'WARN':
      return '#fff3e0';
    case 'INFO':
      return '#e3f2fd';
    case 'DEBUG':
      return '#f3e5f5';
    default:
      return 'transparent';
  }
};

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
  const filteredLogs = filterLogsBySearch(
    filterLogsByLevel(logs, logLevel),
    searchQuery
  );

  return (
    <Box>
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

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredLogs}
          columns={LOG_GRID_COLUMNS}
          pageSizeOptions={[25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          disableRowSelectionOnClick
          getRowClassName={(params) => `log-level-${params.row.level?.toLowerCase()}`}
          sx={{
            '& .MuiDataGrid-row': {
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