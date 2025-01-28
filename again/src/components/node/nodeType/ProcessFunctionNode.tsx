import { memo } from "react";
import { IFunction } from "../dataType";
import { NodeTag } from "./NodeTag";
import { getHandleStyle } from "../utils";
import { Handle, Position } from "@xyflow/react";


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

    return (
        <div
            key={token_name}
            style={{
                border: "1px dashed black",
                borderRadius: "4px",
            }}
            className={`flex w-full`}>
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