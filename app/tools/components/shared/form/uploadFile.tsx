// components/UploadFile.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Preview } from './preview';

interface UploadFileProps {
  onUpload: (files: File | File[]) => void;
  maxFiles?: number;
}

export const UploadFile: React.FC<UploadFileProps> = ({ onUpload, maxFiles = 1 }) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, maxFiles);

    setFiles([...files, ...newFiles]);
    onUpload(maxFiles === 1 ? newFiles[0] : newFiles);
  }, [files, maxFiles, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
  });

  return (
    <div className="file-upload-container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <p>
          {maxFiles === 1
            ? 'Drag & drop a file here, or click to select a file'
            : 'Drag & drop files here, or click to select files'}
        </p>
      </div>
      <Preview files={files} />
      <style jsx>{`
        .file-upload-container {
          margin-top: 20px;
        }
        .dropzone {
          border: 2px dashed #cccccc;
          border-radius: 4px;
          cursor: pointer;
          padding: 20px;
          text-align: center;
        }
        .active {
          border-color: #2196f3;
        }
      `}</style>
    </div>
  );
};
