import { memo } from "react";
import { IFunction } from "../dataType";
import { NodeTag } from "./NodeTag";
import { Handle, Position } from '@xyflow/react';

const FunctionNode = ({
    data, isConnectable ,
}:{
    data: IFunction,
    isConnectable: boolean
}) => {
    const token_name = data.name;

    const getHandleStyle = (index: number, total: number) => {
        const spacing = 100 / (total+1); // 100% / number of handles
        const position = spacing * (index+1);
    
        return { left: `${position}%` };
      };

    return (
        <div
            id={"parentNode"}
            key={token_name}
            style={{
                backgroundColor: "rgba(145, 29, 201, 0.05)" ,
                border: "1px dashed black",
                borderRadius: "4px"
            }}
            className={`flex`}>
            <NodeTag type="function" />
            <div className="flex items-center px-3 text-xs font-medium overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
                {token_name}
            </div>

            {/* Dynamically create handles based on input */}
            {data.input && data.input.length > 0 && (
            <>
            {data.input.map((_, index) => (
                <Handle
                key={`input-${index}`}
                type="source"
                position={Position.Top}
                id={`input-${index}`}
                isConnectable={isConnectable}
                style={getHandleStyle(index, data.input.length)}
                />
            ))}
            </>
            )}
            {data.output && data.output.length > 0 && (
            <>
            {data.output.map((_, index) => (
                <Handle
                key={`output-${index}`}
                type="source"
                position={Position.Bottom}
                id={`input-${index}`}
                isConnectable={isConnectable}
                style={getHandleStyle(index, data.output.length)}
                />
            ))}
            </>
            )}
        </div>
    )
}

export default memo(FunctionNode);