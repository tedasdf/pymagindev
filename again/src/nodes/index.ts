import type { NodeTypes } from '@xyflow/react';
import ClassNode from '../components/node/nodeType/ClassNode';
import FunctionNode from '../components/node/nodeType/FunctionNode';
import FileNode from '../components/node/nodeType/FileNode';
import ConstantNode from '../components/node/nodeType/ConstantNode';
import LogicStatNode from '../components/node/nodeType/LogicStatNode';
import CallNode from '../components/node/nodeType/CallNode';
import VariableNode from '../components/node/nodeType/VariableNode';
import ProcessFunctionNode from '../components/node/nodeType/ProcessFunctionNode';

export const initialNodes = [
  // {
  //   id: 'clin/agent.py',
  //   type: 'fileNode',
  //   position: {x: 0 , y: 0},
  //   draggable: false,
  //   data: { 
  //     token: 'clin/agent.py',
  //     width: 250,
  //     height: 250,
  //   },
  //   style: {
  //     width: 250,
  //     height: 250
  //   }
  // },
  // {
  //   id:'variable',
  //   type:'variableNode',
  //   position: {x: 100, y:150},
  //   data:{
  //     name: 'fewshots',

  //   }
  // },
  // {
  //   id:'function-error',
  //   type:'callNode',
  //   position: { x: 0 , y : 50},
  //   data:{
  //     functionName:'raiseerror'
  //   },
  //   style:{
  //     width: '10px', // small rectangle width
  //     height: '5px', // small rectangle height
  //   }
  // },
  // {
  //   id:'function-generate',
  //   type:'processFunctionNode',
  //   position: {x: 300, y: 0},
  //   data:{
  //     name: 'generate',
  //     input: [
  //       'self' , 
  //       'question' , 
  //       'key' , 
  //       'examples',
  //       'prompt',
  //       'summary_prompt',
  //       'meta_summary_prompt',
  //       'additional_keys',
  //       'meta_summart_additional_keys',
  //       'fewshot_type',
  //       'summary_system',
  //       'meta_summary_system',
  //       'quadrant',
  //       'patience',
  //       'reset'
  //     ],
  //     output: [
  //       'out'
  //     ]
  //   },
  //   isConnectable: true,
  //   style: {
  //     width: 250,
  //     height: 250
  //   }
  // },
  // {
  //   id:'quadrant',
  //   type:'variableNode',
  //   position: {x: 100, y:150},
  //   data:{
  //     name: 'fewshots',

  //   }
  // },
  // {
  //   id:'function-Logic1',
  //   type:'logicstateNode',
  //   position:{x : 100 , y: 100},
  //   data: {
  //     type: 'if',
  //     branch: 1
  //   },
  //   draggable: true,
  // },
  // {
  //   id:'prompt',
  //   type:'variableNode',
  //   position: {x: 100, y:150},
  //   data:{
  //     name: 'fewshots',

  //   }
  // },
  // {
  //   id:'summary_prompt',
  //   type:'variableNode',
  //   position: {x: 100, y:150},
  //   data:{
  //     name: 'fewshots',

  //   }
  // },
  // {
  //   id:'meta_summary_prompt',
  //   type:'variableNode',
  //   position: {x: 100, y:150},
  //   data:{
  //     name: 'fewshots',

  //   }
  // },
  // {
  //   id:'examples',
  //   type:'variableNode',
  //   position: {x: 100, y:150},
  //   data:{
  //     name: 'fewshots',

  //   }
  // },
  // {
  //   id:'function-Logic2',
  //   type:'logicstateNode',
  //   position:{x : 100 , y: 100},
  //   data: {
  //     type: 'if',
  //     branch: 1
  //   },
  //   draggable: true,
  // },
  // {
  //   id:'fewshot_type',
  //   type:'variableNode',
  //   position: {x: 100, y:150},
  //   data:{
  //     name: 'fewshots',

  //   }
  // },
  // {
  //   id:'function-Logic3',
  //   type:'logicstateNode',
  //   position:{x : 100 , y: 100},
  //   data: {
  //     type: 'if',
  //     branch: 1
  //   },
  //   draggable: true,
  // },
  // { id: 'a', type: 'classNode', position: { x: 0, y: 0 }, data: { name: 'CLIN' } 
  // },
  // {
  //   id: 'd',
  //   type: 'functionNode', 
  //   position: { x: 0, y: 10 },
  //   data: { name: 'with React Flow'  , input:["input1" , "INPUT2"] , output:["x" , "y" , "z"]}
  // },
];

export const nodeTypes = {
  'classNode': ClassNode,
  'functionNode': FunctionNode,
  'fileNode': FileNode,
  'constantNode': ConstantNode,
  'logicstateNode': LogicStatNode,
  'callNode': CallNode,
  'variableNode': VariableNode,
  'processFunctionNode': ProcessFunctionNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;

