import type { NodeTypes } from '@xyflow/react';

import { PositionLoggerNode } from './PositionLoggerNode';
import ClassNode from '../components/node/nodeType/ClassNode';
import FunctionNode from '../components/node/nodeType/FunctionNode';
import FileNode from '../components/node/nodeType/FileNode';
import ConstantNode from '../components/node/nodeType/ConstantNode';
import LogicStatNode from '../components/node/nodeType/LogicStatNode';
import CallNode from '../components/node/nodeType/CallNode';

export const initialNodes = [
  {
    id: 'clin/agent.py',
    type: 'fileNode',
    position: {x: 0 , y: 0},
    draggable: false,
    data: { 
      token: 'clin/agent.py',
      width: 250,
      height: 250,
    },
    style: {
      width: 250,
      height: 250
    }
  },
  {
    id:'function-Logic',
    type:'logicstateNode',
    position:{x : 100 , y: 100},
    data: {
      type: 'if',
      branch: 3
    },
    draggable: true,
  },
  {
    id:'function-error',
    type:'callNode',
    position: { x: 0 , y : 50},
    data:{
      functionName:'raiseerror'
    },
    style:{
      width: '10px', // small rectangle width
      height: '5px', // small rectangle height
    }
  },
  // {
  //   id: '1' , 
  //   type: 'constantNode', 
  //   position: {x: 0 , y: 20 } , 
  //   data: {name : 'CLIN_BENCHMARK_FEWSHORTS'},
  //   parentId: 'clin/agent.py',
  //   extent: 'parent',
  // },
  // {
  //   id: '2' , 
  //   type: 'constantNode', 
  //   position: {x: 0 , y: 40 } , 
  //   data: {name : 'CLIN_PROMPTS'},
  //   parentId: 'clin/agent.py',
  //   extent: 'parent',
  // },  
  // {
  //   id: '3' , 
  //   type: 'constantNode', 
  //   position: {x: 0 , y: 60 } , 
  //   data: {name : 'CLIN_FEWSHOTS'},
  //   parentId: 'clin/agent.py',
  //   extent: 'parent',
  // },
  // {
  //   id: '4' , 
  //   type: 'constantNode', 
  //   position: {x: 0 , y: 70 } , 
  //   data: {name : 'CLIN_STRATEGIES'},
  //   parentId: 'clin/agent.py',
  //   extent: 'parent',
  // },
  // {
  //   id: '5' , 
  //   type: 'constantNode', 
  //   position: {x: 0 , y: 80 } , 
  //   data: {name : 'CLIN_SUMMARY_SYSTEM'},
  //   parentId: 'clin/agent.py',
  //   extent: 'parent',
  // },
  // {
  //   id: '6' , 
  //   type: 'constantNode', 
  //   position: {x: 0 , y: 90 } , 
  //   data: {name : 'CLIN_META_SUMMARY_SYSTEM'}, 
  //   parentId: 'clin/agent.py',
  //   extent: 'parent',
  // },
  { id: 'a', type: 'classNode', position: { x: 0, y: 0 }, data: { name: 'CLIN' } 
  },
  {
    id: 'd',
    type: 'functionNode', 
    position: { x: 0, y: 10 },
    data: { name: 'with React Flow'  , input:["input1" , "INPUT2"] , output:["x" , "y" , "z"]}
  },
  
  // {
  //   id:  'clin/agent.py',
  //   type: "fileNode",
  //   position: { x: 0, y: 0 },
  //   draggable: false,
  //   data: {
  //     label:  'clin/agent.py',
  //     parentNode:  'clin/agent.py',
  //     width: 100,
  //     height: 90,
  //     type: "fileNode",
  //     childNodes: [{
  //         id: 'functionNode-generate',
  //         parentNode: 'clin/agent.py',
  //         extent: "parent",
  //         type: "functionNode",
  //         position:  {x:10, y:10},
  //         data: {
  //           label: 'generate',
  //           parentNode: 'clin/agent.py',
  //           type: "processors",
  //           height: 40,
  //           id: 'functionNode-generate',
  //           position: {x:10, y:10},
  //         },
  //         draggable: false,
  //       }]
  //   },
  // }
];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  'classNode': ClassNode,
  'functionNode': FunctionNode,
  'fileNode': FileNode,
  'constantNode': ConstantNode,
  'logicstateNode': LogicStatNode,
  'callNode': CallNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;

