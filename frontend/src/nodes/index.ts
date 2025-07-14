import type { NodeTypes } from '@xyflow/react';
import ClassNode from '../components/node/nodeType/ClassNode';
import FunctionNode from '../components/node/nodeType/FunctionNode';
import FileNode from '../components/node/nodeType/FileNode';
import ConstantNode from '../components/node/nodeType/ConstantNode';
import LogicStatNode from '../components/node/nodeType/LogicStatNode';
import CallNode from '../components/node/nodeType/CallNode';
import VariableNode from '../components/node/nodeType/VariableNode';
import ProcessFunctionNode from '../components/node/nodeType/ProcessFunctionNode';
import SymbolNode from '../components/node/nodeType/SymbolNode';

export const initialNodes = [
];

export const nodeTypes = {
  'classNode': ClassNode,
  'functionNode': FunctionNode,
  'fileNode': FileNode,
  'constantNode': ConstantNode,
  'logicstateNode': LogicStatNode,
  'callNode': CallNode,
  'variableNode': VariableNode,
  'processFunctionNode': ProcessFunctionNode,
  'symbolNode': SymbolNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;

