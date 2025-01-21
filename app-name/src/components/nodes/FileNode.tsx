import React from 'react';
import { Handle, Position } from '@xyflow/react';
// import FunctionNode from './FunctionNode'; // assuming FunctionNode is defined
// import ClassNode from './ClassNode'; // assuming ClassNode is defined

interface FileNodeProps {
    id: string;
    children: any;  // Children can be any valid React child (string, element, etc.)
  }
  
  const FileNode: React.FC<FileNodeProps> = ({ id, children }) => {
  return (
    <div
      style={{
        border: '2px dotted black',
        padding: '10px',
        borderRadius: '8px',
        position: 'relative',
      }}
      className="file-node"
    >
      <div className="file-node-content">
        {children} {/* Render child nodes inside this group */}
      </div>
    </div>
  );
};

export default FileNode;