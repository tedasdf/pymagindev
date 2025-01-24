import type { NodeTypes } from '@xyflow/react';

import { PositionLoggerNode } from './PositionLoggerNode';
import ClassNode from '../components/node/nodeType/ClassNode';
import FunctionNode from '../components/node/nodeType/functionNode';
import FileNode from '../components/node/nodeType/FileNode';

export const initialNodes = [
  { id: 'a', type: 'classNode', position: { x: 0, y: 0 }, data: { name: 'CLIN' } },
  {
    id: 'b',
    type: 'position-logger',
    position: { x: -100, y: 100 },
    data: { label: 'drag me!' },
  },
  { id: 'c', position: { x: 100, y: 100 }, data: { label: 'your ideas' } },
  {
    id: 'd',
    type: 'functionNode', 
    position: { x: 0, y: 10 },
    data: { name: 'with React Flow'  , input:["input1" , "INPUT2"] , output:["x" , "y" , "z"]},
    parentId: 'clin/agent.py',
    extent: 'parent',
  },
  {
    id: 'clin/agent.py',
    type: 'fileNode',
    position: {x: 0 , y: 0},
    data: { 
      token: 'clin/agent.py',
      width: 250,
      height: 250
    },
    style: {
      width: 250,
      height: 250
    }
  },
  {
    id: 'B',
    type: 'input',
    position: { x: -100, y: 200 },
    data: null,
    style: {
      width: 170,
      height: 140,
      backgroundColor: 'rgba(240,240,240,0.25)',
      borderRadius: '10px'
    },
  },
  {
    id: 'B-1',
    data: { label: 'Child 1' },
    position: { x: 50, y: 10 },
    parentId: 'B',
    extent: 'parent',
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: 'B-2',
    data: { label: 'Child 2' },
    position: { x: 10, y: 90 },
    parentId: 'B',
    extent: 'parent',
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: 'B-3',
    data: { label: 'Child 3' },
    position: { x: 100, y: 90 },
    parentId: 'B',
    extent: 'parent',
    draggable: false,
    style: {
      width: 60,
    },
  },
];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  'classNode': ClassNode,
  'functionNode': FunctionNode,
  'fileNode': FileNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;
