import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  InsertDriveFile as InsertDriveFileIcon,
} from '@mui/icons-material';

interface FileUploadAreaProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedFiles: File[];
  isProcessing: boolean;
  uploadProgress: number;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onFileUpload,
  uploadedFiles,
  isProcessing,
  uploadProgress,
}) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ログファイルアップロード
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        解析したいログファイルをアップロードしてください。複数ファイルの同時アップロードに対応しています。
      </Typography>

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
          accept=".log,.txt"
          onChange={onFileUpload}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            ログファイルをドロップまたはクリックしてアップロード
          </Typography>
          <Typography variant="body2" color="text.secondary">
            .log, .txt ファイルに対応
          </Typography>
          <Button variant="contained" component="span" sx={{ mt: 2 }}>
            ファイルを選択
          </Button>
        </label>
      </Paper>

      {isProcessing && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            ファイル処理中... {Math.round(uploadProgress)}%
          </Typography>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Box>
      )}

      {uploadedFiles.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            アップロード済みファイル
          </Typography>
          {uploadedFiles.map((file, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <InsertDriveFileIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FileUploadArea;