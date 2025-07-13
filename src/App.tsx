import React from 'react';
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
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

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
    tech: ['React', 'Material-UI', 'TypeScript']
  },
  {
    title: 'タスク管理アプリ',
    description: 'チーム向けのタスク管理アプリケーション',
    tech: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'ポートフォリオサイト',
    description: 'Material-UI を使ったポートフォリオサイト',
    tech: ['React', 'Material-UI', 'GitHub Pages']
  }
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Material-UI サンプルサイト
          </Typography>
          <Button color="inherit">ホーム</Button>
          <Button color="inherit">プロジェクト</Button>
          <Button color="inherit">連絡先</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">スキル</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {skills.map((skill) => (
                    <Chip key={skill} label={skill} variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">プロジェクト</Typography>
                </Box>
                <List>
                  {projects.map((project, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <StarIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={project.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {project.description}
                            </Typography>
                            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {project.tech.map((tech) => (
                                <Chip key={tech} label={tech} size="small" />
                              ))}
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined">
                  すべてのプロジェクトを見る
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            お問い合わせ
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            プロジェクトのご相談やお問い合わせはお気軽にどうぞ
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" size="large" sx={{ mr: 2 }}>
              メールで連絡
            </Button>
            <Button variant="outlined" size="large">
              GitHubを見る
            </Button>
          </Box>
        </Box>
      </Container>

      <Box component="footer" sx={{ bgcolor: 'grey.100', py: 6, mt: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Material-UI サンプルサイト. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
