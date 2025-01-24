import type { NodeTypes } from '@xyflow/react';

import { PositionLoggerNode } from './PositionLoggerNode';
import ClassNode from '../components/node/nodeType/ClassNode';

export const initialNodes = [
  { id: 'a', type: 'classNode', position: { x: 0, y: 0 }, data: { name: 'wire' }, style: {widt: 100} },
  {
    id: 'b',
    type: 'position-logger',
    position: { x: -100, y: 100 },
    data: { label: 'drag me!' },
  },
  { id: 'c', position: { x: 100, y: 100 }, data: { label: 'your ideas' } },
  {
    id: 'd',
    type: 'output',
    position: { x: 0, y: 200 },
    data: { label: 'with React Flow' },
  },
];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  'classNode': ClassNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
