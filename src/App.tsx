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

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00acc1',
    },
    secondary: {
      main: '#ff5722',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
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
  { text: 'ダッシュボード', icon: <DashboardIcon />, id: 'dashboard' },
  { text: 'ログ検索', icon: <SearchIcon />, id: 'logs' },
  { text: 'アラート', icon: <NotificationsIcon />, id: 'alerts' },
  { text: 'セキュリティ', icon: <SecurityIcon />, id: 'security' },
  { text: 'リアルタイム監視', icon: <MonitorIcon />, id: 'monitor' },
];

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logLevel, setLogLevel] = useState('');
  const [alertCount, setAlertCount] = useState(24);
  const [isRealTime, setIsRealTime] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (pageId: string) => {
    setCurrentPage(pageId);
    setDrawerOpen(false);
  };

  const handleRefresh = () => {
    setLastUpdate(new Date());
    setSnackbarOpen(true);
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

  // リアルタイム更新のシミュレーション
  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
        setAlertCount(prev => prev + Math.floor(Math.random() * 3) - 1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isRealTime]);

  const renderContent = () => {
    switch (currentPage) {

      case 'dashboard':
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" gutterBottom>
                セキュリティダッシュボード
              </Typography>
              <Box>
                <Tooltip title="リアルタイム監視">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isRealTime}
                        onChange={(e) => setIsRealTime(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="リアルタイム"
                  />
                </Tooltip>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  sx={{ ml: 2 }}
                >
                  更新
                </Button>
              </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              最終更新: {lastUpdate.toLocaleString()}
            </Typography>

            {/* メトリクスカード */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {securityMetrics.map((metric, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography color="text.secondary" gutterBottom>
                            {metric.name}
                          </Typography>
                          <Typography variant="h4" component="div">
                            {typeof metric.value === 'number' && metric.value < 100 
                              ? `${metric.value}%` 
                              : metric.value}
                          </Typography>
                        </Box>
                        <Box sx={{ color: metric.color }}>
                          {metric.trend === 'up' && <TrendingUpIcon />}
                          {metric.trend === 'down' && <TrendingDownIcon />}
                          {metric.trend === 'stable' && <CheckCircleIcon />}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* チャート */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    脅威検知 & ブロック状況（24時間）
                  </Typography>
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: threatData.map(d => d.time) }]}
                    series={[
                      { data: threatData.map(d => d.threats), label: '脅威検知', color: '#f44336' },
                      { data: threatData.map(d => d.blocked), label: 'ブロック済み', color: '#4caf50' },
                    ]}
                    width={600}
                    height={300}
                  />
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    ログソース分布
                  </Typography>
                  <PieChart
                    series={[{ data: logSourceData }]}
                    width={300}
                    height={300}
                  />
                </Paper>
              </Grid>
            </Grid>

            {/* 最新アラート */}
            <Paper sx={{ p: 2, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                最新アラート
              </Typography>
              <List>
                {alerts.slice(0, 5).map((alert) => (
                  <ListItem key={alert.id} divider>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      {getLogLevelIcon(alert.level)}
                      <Box sx={{ ml: 2, flex: 1 }}>
                        <Typography variant="body1">{alert.message}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {alert.source} - {alert.timestamp}
                        </Typography>
                      </Box>
                      <Chip 
                        label={alert.status} 
                        color={getStatusColor(alert.status)} 
                        size="small"
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        );

      case 'logs':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              ログ検索
            </Typography>
            
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
                rows={logEntries.filter(log => 
                  (searchQuery === '' || log.message.toLowerCase().includes(searchQuery.toLowerCase())) &&
                  (logLevel === '' || log.level === logLevel)
                )}
                columns={logColumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 25, 50]}
                getRowClassName={(params) => `log-level-${params.row.level.toLowerCase()}`}
              />
            </Paper>
          </Box>
        );

      case 'alerts':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              アラート管理
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    アクティブアラート
                  </Typography>
                  <List>
                    {alerts.map((alert) => (
                      <ListItem key={alert.id} divider>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', p: 1 }}>
                          {getLogLevelIcon(alert.level)}
                          <Box sx={{ ml: 2, flex: 1 }}>
                            <Typography variant="h6">{alert.message}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              ソース: {alert.source} | 時刻: {alert.timestamp}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Chip 
                              label={alert.status} 
                              color={getStatusColor(alert.status)} 
                              size="small"
                            />
                            <Box>
                              <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                                詳細
                              </Button>
                              <Button size="small" variant="contained" color="success">
                                解決
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      アラート統計
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2">オープン</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={60} 
                        color="error"
                        sx={{ mt: 1 }} 
                      />
                      <Typography variant="body2" align="right">3/5</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2">調査中</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={20} 
                        color="warning"
                        sx={{ mt: 1 }} 
                      />
                      <Typography variant="body2" align="right">1/5</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2">解決済み</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={20} 
                        color="success"
                        sx={{ mt: 1 }} 
                      />
                      <Typography variant="body2" align="right">1/5</Typography>
                    </Box>
                  </CardContent>
                </Card>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>アラート設定</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="エラーレベル通知"
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="警告レベル通知"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="情報レベル通知"
                    />
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Box>
        );

      case 'security':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              セキュリティ分析
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    攻撃パターン分析
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
                    series={[
                      { data: [12, 8, 24, 18, 32, 28, 15], label: 'SQLインジェクション', color: '#f44336' },
                      { data: [5, 12, 8, 22, 16, 20, 10], label: 'XSS攻撃', color: '#ff9800' },
                      { data: [8, 6, 15, 12, 20, 18, 12], label: 'ブルートフォース', color: '#9c27b0' },
                    ]}
                    width={500}
                    height={300}
                  />
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    地理的脅威分布
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <VpnLockIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      地理的脅威マップ
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      (実装予定)
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    セキュリティイベント詳細
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>時刻</TableCell>
                          <TableCell>イベントタイプ</TableCell>
                          <TableCell>送信元IP</TableCell>
                          <TableCell>対象リソース</TableCell>
                          <TableCell>アクション</TableCell>
                          <TableCell>ステータス</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>15:30:24</TableCell>
                          <TableCell>認証失敗</TableCell>
                          <TableCell>192.168.1.100</TableCell>
                          <TableCell>/admin/login</TableCell>
                          <TableCell>ブロック</TableCell>
                          <TableCell><Chip label="処理済み" color="success" size="small" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>15:28:12</TableCell>
                          <TableCell>SQLインジェクション</TableCell>
                          <TableCell>203.0.113.45</TableCell>
                          <TableCell>/api/search</TableCell>
                          <TableCell>ブロック</TableCell>
                          <TableCell><Chip label="処理済み" color="success" size="small" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>15:25:45</TableCell>
                          <TableCell>異常なトラフィック</TableCell>
                          <TableCell>198.51.100.23</TableCell>
                          <TableCell>/api/*</TableCell>
                          <TableCell>レート制限</TableCell>
                          <TableCell><Chip label="監視中" color="warning" size="small" /></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      case 'monitor':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              リアルタイム監視
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'between', mb: 2 }}>
                    <Typography variant="h6">
                      システム稼働状況
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      <Typography variant="body2">リアルタイム更新中</Typography>
                    </Box>
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                          <NetworkCheckIcon color="success" sx={{ fontSize: 40 }} />
                          <Typography variant="h6">Web Server</Typography>
                          <Chip label="正常" color="success" size="small" />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                          <StorageIcon color="success" sx={{ fontSize: 40 }} />
                          <Typography variant="h6">Database</Typography>
                          <Chip label="正常" color="success" size="small" />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                          <SecurityIcon color="warning" sx={{ fontSize: 40 }} />
                          <Typography variant="h6">Firewall</Typography>
                          <Chip label="警告" color="warning" size="small" />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                          <MonitorIcon color="success" sx={{ fontSize: 40 }} />
                          <Typography variant="h6">Load Balancer</Typography>
                          <Chip label="正常" color="success" size="small" />
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Paper>
                
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    リアルタイムログストリーム
                  </Typography>
                  <Box sx={{ 
                    height: 300, 
                    overflow: 'auto', 
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 1,
                    fontFamily: 'monospace'
                  }}>
                    {logEntries.slice(0, 10).map((log) => (
                      <Box key={log.id} sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: '0.875rem' }}>
                        <Typography component="span" sx={{ color: 'text.secondary', mr: 2 }}>
                          {log.timestamp}
                        </Typography>
                        <Chip 
                          label={log.level} 
                          color={getLogLevelColor(log.level)} 
                          size="small" 
                          sx={{ mr: 2, minWidth: 60 }}
                        />
                        <Typography component="span" sx={{ color: 'text.secondary', mr: 2 }}>
                          [{log.source}]
                        </Typography>
                        <Typography component="span">
                          {log.message}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    アクティブ接続
                  </Typography>
                  <Typography variant="h3" color="primary.main">1,247</Typography>
                  <Typography variant="body2" color="text.secondary">
                    同時接続数
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={62} 
                    sx={{ mt: 2 }}
                  />
                </Paper>
                
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    CPU使用率
                  </Typography>
                  <Typography variant="h3" color="warning.main">78%</Typography>
                  <Typography variant="body2" color="text.secondary">
                    サーバー平均
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={78} 
                    color="warning"
                    sx={{ mt: 2 }}
                  />
                </Paper>
                
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    メモリ使用率
                  </Typography>
                  <Typography variant="h3" color="success.main">45%</Typography>
                  <Typography variant="body2" color="text.secondary">
                    使用可能: 12GB / 22GB
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={45} 
                    color="success"
                    sx={{ mt: 2 }}
                  />
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
              SecureLog Analytics
            </Typography>
            <Tooltip title="アラート">
              <IconButton color="inherit">
                <Badge badgeContent={alertCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="エクスポート">
              <IconButton color="inherit">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Button color="inherit" onClick={() => setDialogOpen(true)}>
              管理者
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
            <Link underline="hover" color="inherit" href="#" onClick={() => setCurrentPage('dashboard')}>
              ダッシュボード
            </Link>
            <Typography color="text.primary">
              {menuItems.find(item => item.id === currentPage)?.text || 'ダッシュボード'}
            </Typography>
          </Breadcrumbs>

          <Container maxWidth="lg">
            {renderContent()}
          </Container>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>管理者ログイン</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ユーザー名"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="パスワード"
            type="password"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>キャンセル</Button>
          <Button onClick={() => { setDialogOpen(false); setSnackbarOpen(true); }} variant="contained">
            ログイン
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          データが更新されました
        </Alert>
      </Snackbar>

      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, mt: 6, borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 SecureLog Analytics. セキュリティログ解析プラットフォーム
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Built with Material-UI
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
