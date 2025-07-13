import React, { useState } from 'react';
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
  ListItemAvatar,
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
  Radio,
  RadioGroup,
  Slider,
  Switch,
  Rating,
  Fab,
  Snackbar,
  Alert,
  Badge,
  Tooltip,
  LinearProgress,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Breadcrumbs,
  Link,
  Paper,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const skills = [
  'React', 'TypeScript', 'Material-UI', 'Node.js', 'JavaScript', 'HTML5', 'CSS3', 'Git'
];

const projects = [
  {
    title: 'Eコマースサイト',
    description: 'React と Material-UI を使用したレスポンシブなEコマースサイト',
    tech: ['React', 'Material-UI', 'TypeScript'],
    rating: 4.5,
    status: 'completed'
  },
  {
    title: 'タスク管理アプリ',
    description: 'チーム向けのタスク管理アプリケーション',
    tech: ['React', 'Node.js', 'MongoDB'],
    rating: 4.2,
    status: 'in-progress'
  },
  {
    title: 'ポートフォリオサイト',
    description: 'Material-UI を使ったポートフォリオサイト',
    tech: ['React', 'Material-UI', 'GitHub Pages'],
    rating: 4.8,
    status: 'completed'
  }
];

// Chart data
const salesData = [
  { month: '1月', sales: 4000, profit: 2400 },
  { month: '2月', sales: 3000, profit: 1398 },
  { month: '3月', sales: 2000, profit: 9800 },
  { month: '4月', sales: 2780, profit: 3908 },
  { month: '5月', sales: 1890, profit: 4800 },
  { month: '6月', sales: 2390, profit: 3800 },
];

const pieData = [
  { id: 0, value: 10, label: 'React' },
  { id: 1, value: 15, label: 'TypeScript' },
  { id: 2, value: 20, label: 'Material-UI' },
  { id: 3, value: 25, label: 'Node.js' },
];

// Table data
const rows = [
  { id: 1, name: '田中太郎', email: 'tanaka@example.com', role: 'Developer', status: 'Active' },
  { id: 2, name: '佐藤花子', email: 'sato@example.com', role: 'Designer', status: 'Active' },
  { id: 3, name: '鈴木次郎', email: 'suzuki@example.com', role: 'Manager', status: 'Inactive' },
  { id: 4, name: '高橋美咲', email: 'takahashi@example.com', role: 'Developer', status: 'Active' },
  { id: 5, name: '伊藤健', email: 'ito@example.com', role: 'Analyst', status: 'Active' },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: '名前', width: 150 },
  { field: 'email', headerName: 'メール', width: 200 },
  { field: 'role', headerName: '役職', width: 130 },
  { field: 'status', headerName: 'ステータス', width: 130 },
];

const drawerWidth = 240;

const menuItems = [
  { text: 'ホーム', icon: <HomeIcon />, id: 'home' },
  { text: 'ダッシュボード', icon: <BarChartIcon />, id: 'dashboard' },
  { text: 'データテーブル', icon: <TableChartIcon />, id: 'table' },
  { text: '設定', icon: <SettingsIcon />, id: 'settings' },
];

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(30);
  const [checked, setChecked] = useState(false);
  const [rating, setRatingValue] = useState(4);
  const [selectValue, setSelectValue] = useState('');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleMenuClick = (pageId: string) => {
    setCurrentPage(pageId);
    setDrawerOpen(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main'
                }}
              >
                <PersonIcon sx={{ fontSize: 60 }} />
              </Avatar>
              <Typography variant="h3" component="h1" gutterBottom>
                田村 太郎
              </Typography>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                フロントエンド開発者
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Material-UI を使用したモダンなWebアプリケーション開発を専門としています。
                ユーザビリティとパフォーマンスを重視した設計を心がけています。
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Rating value={rating} onChange={(event, newValue) => setRatingValue(newValue || 0)} />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  評価: {rating}/5
                </Typography>
              </Box>
            </Box>

            <Tabs value={currentTab} onChange={handleTabChange} centered>
              <Tab label="スキル" />
              <Tab label="プロジェクト" />
              <Tab label="フォーム例" />
            </Tabs>

            <Box sx={{ mt: 3 }}>
              {currentTab === 0 && (
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="h6">技術スキル</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {skills.map((skill) => (
                            <Chip 
                              key={skill} 
                              label={skill} 
                              variant="outlined" 
                              color="primary"
                              onClick={() => setSnackbarOpen(true)}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          プログレス例
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2">React</Typography>
                          <LinearProgress variant="determinate" value={90} sx={{ mt: 1 }} />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2">TypeScript</Typography>
                          <LinearProgress variant="determinate" value={85} sx={{ mt: 1 }} />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2">Material-UI</Typography>
                          <LinearProgress variant="determinate" value={80} sx={{ mt: 1 }} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {currentTab === 1 && (
                <Grid container spacing={3}>
                  {projects.map((project, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4 }}>
                      <Card sx={{ height: '100%' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                              <StarIcon />
                            </Avatar>
                            <Typography variant="h6">{project.title}</Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {project.description}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                            {project.tech.map((tech) => (
                              <Chip key={tech} label={tech} size="small" />
                            ))}
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Rating value={project.rating} readOnly precision={0.1} />
                            <Chip 
                              label={project.status} 
                              color={project.status === 'completed' ? 'success' : 'warning'}
                              size="small"
                            />
                          </Box>
                        </CardContent>
                        <CardActions>
                          <Button size="small">詳細</Button>
                          <Button size="small">
                            <FavoriteIcon />
                          </Button>
                          <Button size="small">
                            <ShareIcon />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {currentTab === 2 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    フォームコンポーネントの例
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="お名前"
                        variant="outlined"
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="メールアドレス"
                        type="email"
                        variant="outlined"
                        margin="normal"
                      />
                      <FormControl fullWidth margin="normal">
                        <InputLabel>カテゴリ</InputLabel>
                        <Select
                          value={selectValue}
                          label="カテゴリ"
                          onChange={(e) => setSelectValue(e.target.value)}
                        >
                          <MenuItem value="web">Web開発</MenuItem>
                          <MenuItem value="mobile">モバイル開発</MenuItem>
                          <MenuItem value="design">デザイン</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="body1" gutterBottom>
                        スライダー値: {sliderValue}
                      </Typography>
                      <Slider
                        value={sliderValue}
                        onChange={(e, value) => setSliderValue(value as number)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                          />
                        }
                        label="通知を受け取る"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="利用規約に同意する"
                      />
                      <Box sx={{ mt: 2 }}>
                        <Button 
                          variant="contained" 
                          onClick={() => setDialogOpen(true)}
                          sx={{ mr: 2 }}
                        >
                          送信
                        </Button>
                        <Button variant="outlined">
                          リセット
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              )}
            </Box>

            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" gutterBottom>
                アコーディオンの例
              </Typography>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>経歴について</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    10年以上のWebアプリケーション開発経験があります。
                    React、Vue.js、Angularなどのモダンフレームワークを使用した
                    大規模プロジェクトの開発に携わってきました。
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>得意分野</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    フロントエンド開発、UI/UXデザイン、パフォーマンス最適化、
                    レスポンシブデザインが得意分野です。
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </>
        );

      case 'dashboard':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              ダッシュボード
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    売上推移
                  </Typography>
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: salesData.map(d => d.month) }]}
                    series={[
                      { data: salesData.map(d => d.sales), label: '売上' },
                      { data: salesData.map(d => d.profit), label: '利益' },
                    ]}
                    width={400}
                    height={300}
                  />
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    技術分布
                  </Typography>
                  <PieChart
                    series={[{ data: pieData }]}
                    width={400}
                    height={300}
                  />
                </Paper>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    月次トレンド
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
                    series={[
                      { data: [2, 5.5, 2, 8.5, 1.5, 5], label: 'プロジェクト数' },
                    ]}
                    width={800}
                    height={300}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      case 'table':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              データテーブル
            </Typography>
            <Paper sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </Paper>
          </Box>
        );

      case 'settings':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              設定
            </Typography>
            <Stepper activeStep={1} sx={{ mb: 4 }}>
              <Step>
                <StepLabel>基本設定</StepLabel>
              </Step>
              <Step>
                <StepLabel>詳細設定</StepLabel>
              </Step>
              <Step>
                <StepLabel>完了</StepLabel>
              </Step>
            </Stepper>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                各種設定項目
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CircularProgress size={24} sx={{ mr: 2 }} />
                <Typography>設定を読み込み中...</Typography>
              </Box>
            </Paper>
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
              Material-UI サンプルサイト
            </Typography>
            <Tooltip title="通知">
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <EmailIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Button color="inherit" onClick={() => setDialogOpen(true)}>
              ログイン
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
            <Link underline="hover" color="inherit" href="#" onClick={() => setCurrentPage('home')}>
              ホーム
            </Link>
            <Typography color="text.primary">
              {menuItems.find(item => item.id === currentPage)?.text || 'ホーム'}
            </Typography>
          </Breadcrumbs>

          <Container maxWidth="lg">
            {renderContent()}
          </Container>
        </Box>
      </Box>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<FileCopyIcon />}
          tooltipTitle="コピー"
        />
        <SpeedDialAction
          icon={<SaveIcon />}
          tooltipTitle="保存"
        />
        <SpeedDialAction
          icon={<PrintIcon />}
          tooltipTitle="印刷"
        />
        <SpeedDialAction
          icon={<ShareIcon />}
          tooltipTitle="共有"
        />
      </SpeedDial>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>ログイン</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="メールアドレス"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="パスワード"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>キャンセル</Button>
          <Button onClick={() => { setDialogOpen(false); setSnackbarOpen(true); }}>
            ログイン
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          操作が正常に完了しました！
        </Alert>
      </Snackbar>

      <Box component="footer" sx={{ bgcolor: 'grey.100', py: 6, mt: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <IconButton color="primary">
              <GitHubIcon />
            </IconButton>
            <IconButton color="primary">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="primary">
              <EmailIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Material-UI サンプルサイト. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
