import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import { LogStats } from '../../types';
import { LOG_SOURCE_DATA } from '../../constants';

interface AnalysisResultsProps {
  logStats: LogStats | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ logStats }) => {
  if (!logStats) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          解析結果
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ログファイルをアップロードして解析を開始してください。
        </Typography>
      </Box>
    );
  }

  const logLevelData = [
    { level: 'ERROR', count: logStats.errorCount, color: '#f44336' },
    { level: 'WARN', count: logStats.warnCount, color: '#ff9800' },
    { level: 'INFO', count: logStats.infoCount, color: '#2196f3' },
    { level: 'DEBUG', count: logStats.debugCount, color: '#9e9e9e' },
  ];

  const statusCodeData = Object.entries(logStats.statusCodes).map(([code, count]) => ({
    code,
    count,
    color: getStatusCodeColor(code),
  }));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        解析結果
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                総ログ数
              </Typography>
              <Typography variant="h4">
                {logStats.totalLogs.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="error">
                エラー数
              </Typography>
              <Typography variant="h4">
                {logStats.errorCount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning">
                警告数
              </Typography>
              <Typography variant="h4">
                {logStats.warnCount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="info">
                ユニークIP数
              </Typography>
              <Typography variant="h4">
                {logStats.uniqueIPs.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ログレベル分布
              </Typography>
              {logLevelData.some(item => item.count > 0) ? (
                <BarChart
                  dataset={logLevelData}
                  xAxis={[{ scaleType: 'band', dataKey: 'level' }]}
                  series={[{ dataKey: 'count', color: '#1976d2' }]}
                  width={400}
                  height={300}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  データがありません
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ログソース分布
              </Typography>
              <PieChart
                series={[
                  {
                    data: LOG_SOURCE_DATA,
                  },
                ]}
                width={400}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>

        {statusCodeData.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  HTTPステータスコード
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {statusCodeData.map(({ code, count, color }) => (
                    <Chip
                      key={code}
                      label={`${code}: ${count}`}
                      sx={{ bgcolor: color, color: 'white' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const getStatusCodeColor = (code: string): string => {
  const codeNum = parseInt(code);
  if (codeNum >= 200 && codeNum < 300) return '#4caf50';
  if (codeNum >= 300 && codeNum < 400) return '#ff9800';
  if (codeNum >= 400 && codeNum < 500) return '#f44336';
  if (codeNum >= 500) return '#9c27b0';
  return '#9e9e9e';
};

export default AnalysisResults;