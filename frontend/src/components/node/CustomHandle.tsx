import React from 'react';
import { Handle, HandleProps, useHandleConnections } from '@xyflow/react';

interface CustomHandleProps extends HandleProps {
  connectionCount: number;
}

export const CustomHandle: React.FC<CustomHandleProps> = ({
  connectionCount = Infinity,
  ...props
}) => {
  const connections = useHandleConnections({
    type: props.type,
  });

  return (
    <Handle
      {...props}
      isConnectable={connections.length < connectionCount}
    />
  );
};
