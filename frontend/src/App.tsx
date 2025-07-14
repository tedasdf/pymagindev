import { useCallback, useState} from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
import { fetchAllFileItems } from './api/item';
import FileHierarchy from './components/Filetoggle/FileHierarchy';

export default function App() {

  const [nodes, setNodes , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const fetchAPI = async () => {
    const rep = await fetchAllFileItems('..test.test_example10.functional');
  
    console.log(rep)

    return rep
  };


  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  return (
  <ReactFlow
    nodes={nodes}
    nodeTypes={nodeTypes}
    onNodesChange={onNodesChange}
    edges={edges}
    edgeTypes={edgeTypes}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    fitView
    style={{zIndex:'0'}}
  >    
  <div className="update-node__controls" style={{ width:'15%'}}>
    <FileHierarchy nodes={nodes} setNodes={setNodes} setEdges={setEdges} />
  </div>  
    <Background />
    <MiniMap />
    <Controls />
  </ReactFlow>
  );
}
