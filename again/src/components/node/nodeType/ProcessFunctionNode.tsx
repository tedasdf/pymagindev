import { memo } from "react";
import { IFunction } from "../dataType";
import { NodeTag } from "./NodeTag";
import { getHandleStyle } from "../utils";
import { Edge, Handle, Position, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { nodeTypes } from "../../../nodes";
import { edgeTypes } from "../../../edges";

const  initialEdges: Edge[]  = [

];

const initialNodes = [
    {
        id:'variable',
        type:'variableNode',
        position: {x: 100, y:150},
        data:{
          name: 'fewshots',
    
        }
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
]

const ProcessFunctionNode = ({
    data,
    isConnectable
}:{
    data: IFunction,
    isConnectable: boolean
}) => {
    const token_name = data.name;
        
        const input_length = data.input?.length ?? 0;
        const output_length = data.output?.length ?? 0;

        const [nodes, , onNodesChange] = useNodesState(initialNodes);
        const [edges, , onEdgesChange] = useEdgesState(initialEdges);

        return (
            <div
                key={token_name}
                style={{
                    backgroundColor: "black" ,
                    border: "1px dashed black",
                    borderRadius: "4px",
                }}
                className={`flex w-fit`}>
                <NodeTag type="function" />
                <div className="flex items-center px-3 text-xs font-medium overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
                    {token_name}
                </div>
    
                {/* Dynamically create handles based on input */}
                {data.input && input_length > 0 && (
                <>
                {data.input.map((_, index) => (
                    <Handle
                    key={`input-${index}`}
                    type="source"
                    position={Position.Top}
                    id={`input-${index}`}
                    isConnectable={isConnectable}
                    style={getHandleStyle(index, input_length)}
                    />
                ))}
                </>
                )}
                {data.output && output_length > 0 && (
                <>
                {data.output.map((_, index) => (
                    <Handle
                    key={`output-${index}`}
                    type="source"
                    position={Position.Bottom}
                    id={`output-${index}`}
                    isConnectable={isConnectable}
                    style={getHandleStyle(index, output_length)}
                    />
                ))}
                </>
                )}
            </div>
        )
}


export default memo(ProcessFunctionNode);