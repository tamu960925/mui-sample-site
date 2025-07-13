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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search as SearchIcon } from '@mui/icons-material';
import { LogEntry } from '../../types';
import { LOG_GRID_COLUMNS, LOG_LEVELS } from '../../constants';
import { filterLogsByLevel, filterLogsBySearch } from '../../utils/logUtils';


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
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const filteredLogs = filterLogsBySearch(
    filterLogsByLevel(logs, logLevel),
    searchQuery
  );

  const handleRowClick = (params: any) => {
    setSelectedLog(params.row);
    setDetailDialogOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailDialogOpen(false);
    setSelectedLog(null);
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
          columns={LOG_GRID_COLUMNS}
          pageSizeOptions={[25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
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

      <Dialog
        open={detailDialogOpen}
        onClose={handleCloseDetail}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          ログ詳細
        </DialogTitle>
        <DialogContent>
          {selectedLog && (
            <Box sx={{ pt: 1 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                <Chip
                  label={selectedLog.level}
                  color={getLogLevelChipColor(selectedLog.level) as any}
                  size="small"
                />
                <Typography variant="h6" component="span">
                  ID: {selectedLog.id}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  タイムスタンプ
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                  {selectedLog.timestamp}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  ソース
                </Typography>
                <Typography variant="body1">
                  {selectedLog.source}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  メッセージ
                </Typography>
                <Paper 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'grey.50',
                    border: '1px solid',
                    borderColor: 'grey.200'
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: 'monospace',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }}
                  >
                    {selectedLog.message}
                  </Typography>
                </Paper>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  ログレベル: {selectedLog.level}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  作成日時: {selectedLog.timestamp}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetail} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LogViewer;