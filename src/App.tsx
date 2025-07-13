import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { useLogAnalyzer } from './hooks/useLogAnalyzer';
import { useUI } from './hooks/useUI';
import MainLayout from './components/Layout/MainLayout';
import Sidebar from './components/Navigation/Sidebar';
import FileUploadArea from './components/FileUpload/FileUploadArea';
import AnalysisResults from './components/Analysis/AnalysisResults';
import LogViewer from './components/Logs/LogViewer';
import { Typography, Box } from '@mui/material';

const App: React.FC = () => {
  const {
    uploadedFiles,
    parsedLogs,
    logStats,
    isProcessing,
    uploadProgress,
    handleFileUpload,
  } = useLogAnalyzer();

  const {
    drawerOpen,
    currentPage,
    snackbarOpen,
    searchQuery,
    logLevel,
    toggleDrawer,
    handleMenuClick,
    hideSnackbar,
    setSearchQuery,
    setLogLevel,
    setCurrentPage,
    showSnackbar,
  } = useUI();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      setTimeout(() => {
        setCurrentPage('analysis');
        showSnackbar();
      }, 1000);
    }
  };

  const renderContent = (): React.ReactElement => {
    switch (currentPage) {
      case 'upload':
        return (
          <FileUploadArea
            onFileUpload={handleFileChange}
            uploadedFiles={uploadedFiles}
            isProcessing={isProcessing}
            uploadProgress={uploadProgress}
          />
        );
      case 'analysis':
        return <AnalysisResults logStats={logStats} />;
      case 'logs':
        return (
          <LogViewer
            logs={parsedLogs}
            searchQuery={searchQuery}
            logLevel={logLevel}
            onSearchChange={setSearchQuery}
            onLogLevelChange={setLogLevel}
          />
        );
      case 'reports':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              レポート
            </Typography>
            <Typography variant="body1" color="text.secondary">
              レポート機能は開発中です。
            </Typography>
          </Box>
        );
      case 'settings':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              設定
            </Typography>
            <Typography variant="body1" color="text.secondary">
              設定機能は開発中です。
            </Typography>
          </Box>
        );
      default:
        return (
          <FileUploadArea
            onFileUpload={handleFileChange}
            uploadedFiles={uploadedFiles}
            isProcessing={isProcessing}
            uploadProgress={uploadProgress}
          />
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar
          open={drawerOpen}
          currentPage={currentPage}
          onMenuClick={handleMenuClick}
        />
        <MainLayout
          drawerOpen={drawerOpen}
          onMenuClick={toggleDrawer}
          snackbarOpen={snackbarOpen}
          onSnackbarClose={hideSnackbar}
        >
          {renderContent()}
        </MainLayout>
      </Box>
    </ThemeProvider>
  );
};

export default App;