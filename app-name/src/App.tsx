import React , {useState} from 'react';
import { ReactFlow, useNodesState, useEdgesState, Background, MiniMap, Controls } from 'reactflow';
import '@xyflow/react/dist/style.css';
import FunctionNode from './components/react-flow/nodes/FunctionNode';
import ParentsNode from './components/react-flow/nodes/ParentsNode';
import ExportersNode from './components/react-flow/nodes/ExportersNode';
import ReceiversNode from './components/react-flow/nodes/ReceiversNode';
import ProcessorsNode from './components/react-flow/nodes/ProcessorsNode';

const initialNodes = [
  {
    id: 'parent',
    type: 'parentNodeType',
    data: { label: 'traces' },
    position: { x: 0, y: 0 },
    style: {
      width: 380,
      height: 180,
    },
  },
  {
    id: 'child',
    type: 'childNodeType',
    data: { label: 'Child' },
    position: { x: 50, y: 50 },
    parentNode: 'parent',
    extent: 'parent'
  }
];

const initialEdges: any[] = [];


const nodeType = {
  "functionNode": FunctionNode,
  "parentNodeType": ParentsNode,
  "processorsNode": ProcessorsNode,
	"receiversNode": ReceiversNode,
	"exportersNode": ExportersNode,
}


// const edgeType = {
//   // "variablePointsToEdge" : VariablePointsToEdge;
//   // "Function flow": 
// };

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };



const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges,, onEdgesChange] = useEdgesState(initialEdges);// Add state for button visibility
  
  // const startseq = async () => {
  //   setButtonVisible(false);
  //   console.log("Trigger useEffect");
  //   let newNode = await fetchAndCreateNodes(nodes);
  //   console.log("This is newNode ")
  //   console.log(newNode);
  //   if (newNode) {
  //     await setNodes((nds) => [...nds, ...newNode]); // Append new nodes to existing nodes
  //   }
  // };

 
  
  // const onNodeClick = (event: React.MouseEvent, node: any) => {
  //   console.log("NOdes");
  //   console.log(nodes);
  // }
  //   setNodes((nds) =>
  //     nds.map((n) => {
  //       if (n.id === node.id) {
  //         // Toggle type and size for the parent node
  //         const newType = n.type === 'default' ? 'group' : 'default';
  //         const newWidth = n.style.width === 150 ? 100 : 250;
  //         const newHeight = n.style.height === 75 ? 50 : 500;

  //         return {
  //           ...n,
  //           type: newType,
  //           style: {
  //             ...n.style,
  //             width: newWidth,
  //             height: newHeight,
  //           },
  //         };
  //       }

  //       if (n.parentId === node.id) {
  //         // Toggle visibility for the sub-node
  //         return {
  //           ...n,
  //           style: {
  //             ...n.style,
  //             display: n.style.display === 'block' ? 'none' : 'block',
  //           },
  //         };
  //       }

  //       // Return unchanged nodes
  //       return n;
  //     })
  //   );
  // };

  return (
    <>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeType}
      defaultViewport={defaultViewport}
      minZoom={0.2}
      className="disable-attribution bg-default"
      maxZoom={4}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap 
        zoomable 
        pannable 
      />
    </ReactFlow>
    {/* {isButtonVisible && <button 
    onClick={startseq}
    style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }} // Adjust position and zIndex
    >Start</button>} Show button conditionally */}
    </>
  );
};

export default Flow;
