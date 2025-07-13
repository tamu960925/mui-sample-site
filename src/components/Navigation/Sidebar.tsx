import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
} from '@mui/material';
import { PageId } from '../../types';
import { DRAWER_WIDTH } from '../../constants';
import {
  UploadFile as UploadFileIcon,
  Analytics as AnalyticsIcon,
  Search as SearchIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  currentPage: PageId;
  onMenuClick: (pageId: PageId) => void;
}

const menuItems = [
  { text: 'ファイルアップロード', icon: <UploadFileIcon />, id: 'upload' as PageId },
  { text: '解析結果', icon: <AnalyticsIcon />, id: 'analysis' as PageId },
  { text: 'ログビューア', icon: <SearchIcon />, id: 'logs' as PageId },
  { text: 'レポート', icon: <AssessmentIcon />, id: 'reports' as PageId },
  { text: '設定', icon: <SettingsIcon />, id: 'settings' as PageId },
];

const Sidebar: React.FC<SidebarProps> = ({ open, currentPage, onMenuClick }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          LogAnalyzer Pro
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={currentPage === item.id}
            onClick={() => onMenuClick(item.id)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;