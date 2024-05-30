// components/PreviewList.tsx
import React from 'react';

interface PreviewProps {
  files: File[];
}

export const Preview: React.FC<PreviewProps> = ({ files }) => {
  return (
    <div className="preview-list-container">
      <h4>Preview:</h4>
      {files.map(file => (
        <div key={file.name} className="file-preview">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
          <p>{file.name}</p>
        </div>
      ))}
      <style jsx>{`
        .preview-list-container {
          margin-top: 10px;
        }
        .file-preview {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};
