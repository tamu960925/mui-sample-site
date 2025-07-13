import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
  Divider,
  ListItemIcon,
  ListItemButton,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Slider,
  Switch,
  Snackbar,
  Alert,
  Badge,
  Tooltip,
  LinearProgress,
  CircularProgress,
  Paper,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SecurityIcon from '@mui/icons-material/Security';
import BugReportIcon from '@mui/icons-material/BugReport';
import MonitorIcon from '@mui/icons-material/Monitor';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import StorageIcon from '@mui/icons-material/Storage';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SettingsIcon from '@mui/icons-material/Settings';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#f57c00',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#f57c00',
    },
    info: {
      main: '#1976d2',
    },
    success: {
      main: '#388e3c',
    },
  },
});

// ログレベル定義
const logLevels = ['ERROR', 'WARN', 'INFO', 'DEBUG'];

// セキュリティメトリクス
const securityMetrics = [
  { name: '脅威検知', value: 24, trend: 'up', color: '#f44336' },
  { name: 'ブロック済み攻撃', value: 156, trend: 'down', color: '#4caf50' },
  { name: 'アクティブセッション', value: 1247, trend: 'up', color: '#2196f3' },
  { name: 'システム稼働率', value: 99.8, trend: 'stable', color: '#4caf50' },
];

// チャートデータ
const threatData = [
  { time: '00:00', threats: 12, blocked: 45 },
  { time: '04:00', threats: 8, blocked: 32 },
  { time: '08:00', threats: 24, blocked: 67 },
  { time: '12:00', threats: 18, blocked: 54 },
  { time: '16:00', threats: 32, blocked: 89 },
  { time: '20:00', threats: 28, blocked: 76 },
];

const logSourceData = [
  { id: 0, value: 35, label: 'Web Server' },
  { id: 1, value: 25, label: 'Database' },
  { id: 2, value: 20, label: 'Application' },
  { id: 3, value: 20, label: 'Network' },
];

// アラートデータ
const alerts = [
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

// ログエントリ
const logEntries = [
  { id: 1, timestamp: '2024-01-13 15:30:24', level: 'ERROR', source: 'auth-service', message: 'Failed login attempt for user admin from 192.168.1.100' },
  { id: 2, timestamp: '2024-01-13 15:30:22', level: 'INFO', source: 'web-server', message: 'GET /api/users 200 45ms' },
  { id: 3, timestamp: '2024-01-13 15:30:20', level: 'WARN', source: 'database', message: 'Query execution time exceeded threshold: 1200ms' },
  { id: 4, timestamp: '2024-01-13 15:30:18', level: 'DEBUG', source: 'cache-service', message: 'Cache miss for key: user_session_abc123' },
  { id: 5, timestamp: '2024-01-13 15:30:16', level: 'ERROR', source: 'payment-service', message: 'Payment processing failed: insufficient funds' },
  { id: 6, timestamp: '2024-01-13 15:30:14', level: 'INFO', source: 'notification-service', message: 'Email notification sent to user@example.com' },
  { id: 7, timestamp: '2024-01-13 15:30:12', level: 'WARN', source: 'api-gateway', message: 'Rate limit approaching for client ID: client_123' },
  { id: 8, timestamp: '2024-01-13 15:30:10', level: 'INFO', source: 'user-service', message: 'User profile updated successfully for user ID: 12345' },
];

const logColumns: GridColDef[] = [
  { field: 'timestamp', headerName: 'Timestamp', width: 180 },
  { field: 'level', headerName: 'Level', width: 100 },
  { field: 'source', headerName: 'Source', width: 150 },
  { field: 'message', headerName: 'Message', width: 500, flex: 1 },
];

const drawerWidth = 240;

const menuItems = [
  { text: 'ファイルアップロード', icon: <UploadFileIcon />, id: 'upload' },
  { text: '解析結果', icon: <AnalyticsIcon />, id: 'analysis' },
  { text: 'ログビューア', icon: <SearchIcon />, id: 'logs' },
  { text: 'レポート', icon: <AssessmentIcon />, id: 'reports' },
  { text: '設定', icon: <SettingsIcon />, id: 'settings' },
];

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('upload');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logLevel, setLogLevel] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [parsedLogs, setParsedLogs] = useState<any[]>([]);
  const [logStats, setLogStats] = useState<any>({});

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (pageId: string) => {
    setCurrentPage(pageId);
    setDrawerOpen(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(fileArray);
      processFiles(fileArray);
    }
  };

  const processFiles = async (files: File[]) => {
    setIsProcessing(true);
    setUploadProgress(0);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const text = await file.text();
      const logs = parseLogFile(text, file.name);
      setParsedLogs(prev => [...prev, ...logs]);
      setUploadProgress(((i + 1) / files.length) * 100);
    }
    
    setIsProcessing(false);
    generateAnalysis();
    setCurrentPage('analysis');
    setSnackbarOpen(true);
  };

  const parseLogFile = (content: string, filename: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    const logs: any[] = [];
    
    lines.forEach((line, index) => {
      // 簡単なログパターンマッチング
      const timestampMatch = line.match(/(\d{4}-\d{2}-\d{2}[\s_T]\d{2}:\d{2}:\d{2})/);
      const levelMatch = line.match(/\b(ERROR|WARN|INFO|DEBUG|TRACE|FATAL)\b/i);
      const ipMatch = line.match(/\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/);
      const statusMatch = line.match(/\b(200|201|400|401|403|404|500|502|503)\b/);
      
      logs.push({
        id: `${filename}_${index}`,
        timestamp: timestampMatch ? timestampMatch[1] : new Date().toISOString(),
        level: levelMatch ? levelMatch[1].toUpperCase() : 'INFO',
        message: line,
        source: filename,
        ip: ipMatch ? ipMatch[1] : null,
        status: statusMatch ? parseInt(statusMatch[1]) : null,
        raw: line
      });
    });
    
    return logs;
  };

  const generateAnalysis = () => {
    const stats = {
      totalLogs: parsedLogs.length,
      errorCount: parsedLogs.filter(log => log.level === 'ERROR').length,
      warnCount: parsedLogs.filter(log => log.level === 'WARN').length,
      infoCount: parsedLogs.filter(log => log.level === 'INFO').length,
      debugCount: parsedLogs.filter(log => log.level === 'DEBUG').length,
      uniqueIPs: Array.from(new Set(parsedLogs.filter(log => log.ip).map(log => log.ip))).length,
      statusCodes: {} as Record<string, number>,
      topErrors: []
    };
    
    // ステータスコード統計
    parsedLogs.forEach(log => {
      if (log.status) {
        stats.statusCodes[log.status] = (stats.statusCodes[log.status] || 0) + 1;
      }
    });
    
    setLogStats(stats);
    setAnalysisResults(stats);
  };

  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case 'ERROR':
        return <ErrorIcon color="error" />;
      case 'WARN':
        return <WarningIcon color="warning" />;
      case 'INFO':
        return <InfoIcon color="info" />;
      case 'DEBUG':
        return <InfoIcon color="disabled" />;
      default:
        return <InfoIcon />;
    }
  };

  const getLogLevelColor = (level: string) => {
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

  const getStatusColor = (status: string) => {
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

  useEffect(() => {
    if (parsedLogs.length > 0) {
      generateAnalysis();
    }
  }, [parsedLogs]);

  const renderContent = () => {
    switch (currentPage) {
      case 'upload':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              ログファイルアップロード
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              解析したいログファイルをアップロードしてください。複数ファイルの同時アップロードに対応しています。
            </Typography>

            {/* ファイルアップロードエリア */}
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                border: '2px dashed',
                borderColor: 'primary.main',
                bgcolor: 'background.paper',
                mb: 3,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <input
                type="file"
                multiple
                accept=".log,.txt,.csv"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  ファイルをドラッグ&ドロップまたはクリックしてアップロード
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  対応形式: .log, .txt, .csv
                </Typography>
              </label>
            </Paper>

            {/* アップロード進行状況 */}
            {isProcessing && (
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  ファイル処理中...
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={uploadProgress} 
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {uploadProgress.toFixed(0)}% 完了
                </Typography>
              </Paper>
            )}

            {/* アップロード済みファイル一覧 */}
            {uploadedFiles.length > 0 && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  アップロード済みファイル
                </Typography>
                <List>
                  {uploadedFiles.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <InsertDriveFileIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={file.name}
                        secondary={`サイズ: ${(file.size / 1024).toFixed(2)} KB`}
                      />
                      <Chip label="処理完了" color="success" size="small" />
                    </ListItem>
                  ))}
                </List>
                
                {analysisResults && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      クイック統計
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Card sx={{ textAlign: 'center', p: 2 }}>
                          <Typography variant="h4" color="primary">
                            {analysisResults.totalLogs}
                          </Typography>
                          <Typography variant="body2">総ログ数</Typography>
                        </Card>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Card sx={{ textAlign: 'center', p: 2 }}>
                          <Typography variant="h4" color="error">
                            {analysisResults.errorCount}
                          </Typography>
                          <Typography variant="body2">エラー</Typography>
                        </Card>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Card sx={{ textAlign: 'center', p: 2 }}>
                          <Typography variant="h4" color="warning">
                            {analysisResults.warnCount}
                          </Typography>
                          <Typography variant="body2">警告</Typography>
                        </Card>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Card sx={{ textAlign: 'center', p: 2 }}>
                          <Typography variant="h4" color="info">
                            {analysisResults.uniqueIPs}
                          </Typography>
                          <Typography variant="body2">ユニークIP</Typography>
                        </Card>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<AnalyticsIcon />}
                        onClick={() => setCurrentPage('analysis')}
                      >
                        詳細な解析結果を表示
                      </Button>
                    </Box>
                  </Box>
                )}
              </Paper>
            )}
          </Box>
        );

      case 'analysis':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              解析結果ダッシュボード
            </Typography>
            
            {!analysisResults ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  まずはログファイルをアップロードしてください
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<UploadFileIcon />}
                  onClick={() => setCurrentPage('upload')}
                  sx={{ mt: 2 }}
                >
                  ファイルアップロードページへ
                </Button>
              </Paper>
            ) : (
              <>
                {/* 統計サマリー */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" color="primary">
                          {analysisResults.totalLogs}
                        </Typography>
                        <Typography variant="h6">総ログエントリ数</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" color="error">
                          {analysisResults.errorCount}
                        </Typography>
                        <Typography variant="h6">エラー件数</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" color="warning">
                          {analysisResults.warnCount}
                        </Typography>
                        <Typography variant="h6">警告件数</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" color="info">
                          {analysisResults.uniqueIPs}
                        </Typography>
                        <Typography variant="h6">ユニークIP数</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* チャート */}
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        ログレベル分布
                      </Typography>
                      <PieChart
                        series={[{
                          data: [
                            { id: 0, value: analysisResults.errorCount, label: 'ERROR' },
                            { id: 1, value: analysisResults.warnCount, label: 'WARN' },
                            { id: 2, value: analysisResults.infoCount, label: 'INFO' },
                            { id: 3, value: analysisResults.debugCount, label: 'DEBUG' },
                          ]
                        }]}
                        width={400}
                        height={300}
                      />
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        ステータスコード分布
                      </Typography>
                      <BarChart
                        xAxis={[{ 
                          scaleType: 'band', 
                          data: Object.keys(analysisResults.statusCodes) 
                        }]}
                        series={[{
                          data: Object.values(analysisResults.statusCodes),
                          label: 'リクエスト数'
                        }]}
                        width={400}
                        height={300}
                      />
                    </Paper>
                  </Grid>
                </Grid>

                {/* 詳細統計 */}
                <Paper sx={{ p: 3, mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    詳細統計情報
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        ログレベル別件数
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary="ERROR" 
                            secondary={`${analysisResults.errorCount} 件`}
                          />
                          <Chip label={`${((analysisResults.errorCount / analysisResults.totalLogs) * 100).toFixed(1)}%`} color="error" size="small" />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="WARN" 
                            secondary={`${analysisResults.warnCount} 件`}
                          />
                          <Chip label={`${((analysisResults.warnCount / analysisResults.totalLogs) * 100).toFixed(1)}%`} color="warning" size="small" />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="INFO" 
                            secondary={`${analysisResults.infoCount} 件`}
                          />
                          <Chip label={`${((analysisResults.infoCount / analysisResults.totalLogs) * 100).toFixed(1)}%`} color="info" size="small" />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="DEBUG" 
                            secondary={`${analysisResults.debugCount} 件`}
                          />
                          <Chip label={`${((analysisResults.debugCount / analysisResults.totalLogs) * 100).toFixed(1)}%`} color="default" size="small" />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        ステータスコード分析
                      </Typography>
                      <List dense>
                        {Object.entries(analysisResults.statusCodes).map(([code, count]) => (
                          <ListItem key={code}>
                            <ListItemText 
                              primary={`HTTP ${code}`} 
                              secondary={`${count} 件`}
                            />
                            <Chip 
                              label={parseInt(code) >= 400 ? 'エラー' : '正常'} 
                              color={parseInt(code) >= 400 ? 'error' : 'success'} 
                              size="small" 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </Paper>
              </>
            )}
          </Box>
        );

      case 'logs':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              ログビューア
            </Typography>
            
            {parsedLogs.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  表示するログがありません
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<UploadFileIcon />}
                  onClick={() => setCurrentPage('upload')}
                  sx={{ mt: 2 }}
                >
                  ログファイルをアップロード
                </Button>
              </Paper>
            ) : (
              <>
                {/* 検索・フィルター */}
                <Paper sx={{ p: 2, mb: 3 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        placeholder="ログメッセージを検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <FormControl fullWidth>
                        <InputLabel>ログレベル</InputLabel>
                        <Select
                          value={logLevel}
                          label="ログレベル"
                          onChange={(e) => setLogLevel(e.target.value)}
                        >
                          <MenuItem value="">すべて</MenuItem>
                          {logLevels.map((level) => (
                            <MenuItem key={level} value={level}>{level}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Button
                        variant="contained"
                        startIcon={<FilterListIcon />}
                        onClick={() => setSnackbarOpen(true)}
                        fullWidth
                      >
                        フィルター適用
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

                {/* ログテーブル */}
                <Paper sx={{ height: 600, width: '100%' }}>
                  <DataGrid
                    rows={parsedLogs.filter(log => 
                      (searchQuery === '' || log.message.toLowerCase().includes(searchQuery.toLowerCase())) &&
                      (logLevel === '' || log.level === logLevel)
                    )}
                    columns={logColumns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 25 },
                      },
                    }}
                    pageSizeOptions={[25, 50, 100]}
                    getRowClassName={(params) => `log-level-${params.row.level.toLowerCase()}`}
                  />
                </Paper>
              </>
            )}
          </Box>
        );

      case 'reports':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              レポート生成
            </Typography>
            
            {!analysisResults ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  レポートを生成するにはログファイルをアップロードしてください
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<UploadFileIcon />}
                  onClick={() => setCurrentPage('upload')}
                  sx={{ mt: 2 }}
                >
                  ファイルアップロードページへ
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                      ログ解析レポート
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      生成日時: {new Date().toLocaleString()}
                    </Typography>
                    
                    <Typography variant="h6" gutterBottom>
                      サマリー
                    </Typography>
                    <Typography variant="body1" paragraph>
                      このレポートは {uploadedFiles.length} 個のログファイルを解析した結果です。
                      総計 {analysisResults.totalLogs} 件のログエントリを処理しました。
                    </Typography>
                    
                    <Typography variant="h6" gutterBottom>
                      主な発見事項
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="エラー率"
                          secondary={`${((analysisResults.errorCount / analysisResults.totalLogs) * 100).toFixed(2)}% (${analysisResults.errorCount}/${analysisResults.totalLogs})`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="警告件数"
                          secondary={`${analysisResults.warnCount} 件の警告が検出されました`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="ユニークIP数"
                          secondary={`${analysisResults.uniqueIPs} 個のユニークなIPアドレスからアクセス`}
                        />
                      </ListItem>
                    </List>
                    
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      推奨事項
                    </Typography>
                    <List>
                      {analysisResults.errorCount > 0 && (
                        <ListItem>
                          <ListItemText 
                            primary="エラー調査"
                            secondary="エラーレベルのログが検出されました。詳細な調査を推奨します。"
                          />
                        </ListItem>
                      )}
                      {analysisResults.warnCount > analysisResults.totalLogs * 0.1 && (
                        <ListItem>
                          <ListItemText 
                            primary="警告監視"
                            secondary="警告が多く検出されています。システムの安定性を確認してください。"
                          />
                        </ListItem>
                      )}
                      <ListItem>
                        <ListItemText 
                          primary="定期監視"
                          secondary="継続的なログ監視体制の構築を推奨します。"
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        レポート操作
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        fullWidth
                        sx={{ mb: 2 }}
                        onClick={() => setSnackbarOpen(true)}
                      >
                        PDFダウンロード
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<EmailIcon />}
                        fullWidth
                        sx={{ mb: 2 }}
                        onClick={() => setSnackbarOpen(true)}
                      >
                        メール送信
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<FileOpenIcon />}
                        fullWidth
                        onClick={() => setSnackbarOpen(true)}
                      >
                        CSV エクスポート
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        レポート設定
                      </Typography>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="詳細統計を含める"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="グラフを含める"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="生ログデータを含める"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Box>
        );

      case 'settings':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              システム設定
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    解析設定
                  </Typography>
                  
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>デフォルトログレベル</InputLabel>
                    <Select defaultValue="INFO" label="デフォルトログレベル">
                      <MenuItem value="ERROR">ERROR</MenuItem>
                      <MenuItem value="WARN">WARN</MenuItem>
                      <MenuItem value="INFO">INFO</MenuItem>
                      <MenuItem value="DEBUG">DEBUG</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="自動IPアドレス検出"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="タイムスタンプ正規化"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="重複ログ除去"
                  />
                </Paper>
                
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    パフォーマンス設定
                  </Typography>
                  
                  <Typography gutterBottom>
                    最大ファイルサイズ (MB)
                  </Typography>
                  <Slider
                    defaultValue={50}
                    min={1}
                    max={500}
                    valueLabelDisplay="auto"
                    sx={{ mb: 3 }}
                  />
                  
                  <Typography gutterBottom>
                    並列処理スレッド数
                  </Typography>
                  <Slider
                    defaultValue={4}
                    min={1}
                    max={16}
                    valueLabelDisplay="auto"
                    step={1}
                  />
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    表示設定
                  </Typography>
                  
                  <FormControlLabel
                    control={<Switch />}
                    label="ダークモード"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="自動更新"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="通知表示"
                  />
                  
                  <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
                    データ保持期間
                  </Typography>
                  <FormControl fullWidth>
                    <Select defaultValue="7">
                      <MenuItem value="1">1日</MenuItem>
                      <MenuItem value="7">1週間</MenuItem>
                      <MenuItem value="30">1ヶ月</MenuItem>
                      <MenuItem value="90">3ヶ月</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
                
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    エクスポート設定
                  </Typography>
                  
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="レポートにメタデータを含める"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="CSV出力時に日本語ヘッダーを使用"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="自動バックアップ生成"
                  />
                  
                  <Button 
                    variant="contained" 
                    sx={{ mt: 2 }}
                    onClick={() => setSnackbarOpen(true)}
                  >
                    設定を保存
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LogAnalyzer Pro
            </Typography>
            <Tooltip title="解析済みファイル数">
              <IconButton color="inherit">
                <Badge badgeContent={uploadedFiles.length} color="secondary">
                  <InsertDriveFileIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="レポートエクスポート">
              <IconButton color="inherit" onClick={() => setCurrentPage('reports')}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Button color="inherit" onClick={() => setDialogOpen(true)}>
              ユーザー
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItemButton 
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                selected={currentPage === item.id}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemButton>
              <ListItemIcon><EmailIcon /></ListItemIcon>
              <ListItemText primary="連絡先" />
            </ListItemButton>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
            <Link underline="hover" color="inherit" href="#" onClick={() => setCurrentPage('upload')}>
              ホーム
            </Link>
            <Typography color="text.primary">
              {menuItems.find(item => item.id === currentPage)?.text || 'ファイルアップロード'}
            </Typography>
          </Breadcrumbs>

          <Container maxWidth="lg">
            {renderContent()}
          </Container>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>ユーザー情報</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            LogAnalyzer Pro へようこそ
          </Typography>
          <Typography variant="body2" color="text.secondary">
            業務用ログ解析ツール - ブラウザ完結型
          </Typography>
          <Typography variant="body2" color="text.secondary">
            セッション: ゲストユーザー
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} variant="contained">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          操作が完了しました
        </Alert>
      </Snackbar>

      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, mt: 6, borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 LogAnalyzer Pro. 業務用ログ解析プラットフォーム
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            ブラウザ完結型 | プライバシー保護 | 高速解析
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
