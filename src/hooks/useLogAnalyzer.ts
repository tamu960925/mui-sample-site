import { useState, useEffect } from 'react';
import { LogEntry, LogStats } from '../types';
import { parseLogFile, generateLogStats } from '../utils/logUtils';

export const useLogAnalyzer = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [parsedLogs, setParsedLogs] = useState<LogEntry[]>([]);
  const [logStats, setLogStats] = useState<LogStats | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const processFiles = async (files: File[]) => {
    setIsProcessing(true);
    setUploadProgress(0);
    setParsedLogs([]);
    
    const allLogs: LogEntry[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const text = await file.text();
      const logs = parseLogFile(text, file.name);
      allLogs.push(...logs);
      setUploadProgress(((i + 1) / files.length) * 100);
    }
    
    setParsedLogs(allLogs);
    setIsProcessing(false);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(fileArray);
      processFiles(fileArray);
    }
  };

  useEffect(() => {
    if (parsedLogs.length > 0) {
      const stats = generateLogStats(parsedLogs);
      setLogStats(stats);
    }
  }, [parsedLogs]);

  return {
    uploadedFiles,
    parsedLogs,
    logStats,
    isProcessing,
    uploadProgress,
    handleFileUpload,
    processFiles,
  };
};