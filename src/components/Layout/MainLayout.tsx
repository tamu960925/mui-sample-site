import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { DRAWER_WIDTH } from '../../constants';

interface MainLayoutProps {
  children: React.ReactNode;
  drawerOpen: boolean;
  onMenuClick: () => void;
  snackbarOpen: boolean;
  onSnackbarClose: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  drawerOpen,
  onMenuClick,
  snackbarOpen,
  onSnackbarClose,
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
          ml: drawerOpen ? `${DRAWER_WIDTH}px` : 0,
          transition: 'width 0.3s, margin 0.3s',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            LogAnalyzer Pro - 業務用ログ解析ツール
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
          ml: drawerOpen ? `${DRAWER_WIDTH}px` : 0,
          transition: 'width 0.3s, margin 0.3s',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth={false} sx={{ height: '100%' }}>
          {children}
        </Container>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={onSnackbarClose}
      >
        <Alert
          onClose={onSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          ログファイルの解析が完了しました！
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MainLayout;