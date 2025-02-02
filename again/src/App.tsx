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
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeHidden, setNodeHidden] = useState(false);

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
  <div className="update-node__controls" style={{width:'15%'}}>
    <FileHierarchy />
  </div>  
  {/* <div
  className="absolute top-4 left-4 bg-blue-500 z-4 pointer-events-auto">
  <button
  onClick={fetchAPI}
>
  Fetch API
</button>
  </div> */}
  <div className="update-node__controls" style={{  right: '10px' , top: '10px'}}>
  <div className="update-node__checkbox-wrapper">
          <label>hidden:</label>
          <input
            type="checkbox"
            checked={nodeHidden}
            onChange={(evt) => setNodeHidden(evt.target.checked)}
          />
        </div>
      </div>
    <Background />
    <MiniMap />
    <Controls />
  </ReactFlow>
  );
}
