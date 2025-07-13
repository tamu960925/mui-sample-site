import { useState } from 'react';
import { PageId } from '../types';

export const useUI = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageId>('upload');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logLevel, setLogLevel] = useState('');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    setDrawerOpen(false);
  };

  const showSnackbar = () => {
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  return {
    drawerOpen,
    currentPage,
    dialogOpen,
    snackbarOpen,
    searchQuery,
    logLevel,
    toggleDrawer,
    handleMenuClick,
    setDialogOpen,
    showSnackbar,
    hideSnackbar,
    setSearchQuery,
    setLogLevel,
    setCurrentPage,
  };
};