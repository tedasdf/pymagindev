import { memo } from "react";
import { IFunction } from "../dataType";
import { NodeTag } from "./NodeTag";
// import { Handle, Position } from '@xyflow/react';
// import { getHandleStyle } from "../utils";
import { fetchAndCreateProcess } from "../../../utils/helper";




const FunctionNode = ({
    data, 
    isConnectable
}:{
    data: IFunction,
    isConnectable: boolean
}) => {
    const token_name = data.name;
    
    // const input_length = data.input?.length ?? 0;
    // const output_length = data.output?.length ?? 0;

    const handleClick = async () => {
        console.log('Function clicked:', token_name);
        try {
            // Add your click handling logic here
            const [newNode ,newEdge] = await fetchAndCreateProcess('..test.test_example10.functional', token_name);
            console.log(newNode); // Changed from response to newNode
            console.log(newEdge);
            // Since newNode is a single node, not an array, remove the spread operator
            data.setNodes((currentNodes) => [...currentNodes, ...newNode]);
            data.setEdges((currentEdges) => [...currentEdges, ...newEdge]);
        } catch (error) {
            console.error('Error creating node:', error);
        }

    };

    return (
        <div
            key={token_name}
            style={{
                backgroundColor: "rgba(145, 29, 201, 0.05)" ,
                border: "1px dashed black",
                borderRadius: "4px",
                position: 'relative'
            }}
            onClick={handleClick}
            className={`flex`}>
            <NodeTag type="function" />
            <div className="flex items-center px-3 text-xs font-medium overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
                {token_name}
            </div>

            {/* Dynamically create handles based on input/*
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
            )} */}
        </div>
    )
}

export default memo(FunctionNode);