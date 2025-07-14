import { memo } from "react";
import { getHandleStyle } from "../utils";
import { Handle, Position } from "@xyflow/react";


interface processFunction {
    name: string;
    input?: string[];
    output?: string[];
    isprocess?: boolean;
}



const ProcessFunctionNode = ({
    data,
    isConnectable
}:{
    data: processFunction,
    isConnectable: boolean
}) => {
    const token_name = data.name;
    const input_length = data.input?.length ?? 0;
    const output_length = data.output?.length ?? 0;
    const isprocess = data.isprocess ?? false;

    return (
        <div
            key={token_name}
            style={{
                position: 'absolute',
                border: "1px dashed black",
                borderRadius: "4px",
            }}
            className={`flex w-full h-full`}>


            <div className="flex justify-end items-start px-3 text-xs font-medium overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
                {token_name}
            </div>

            {/* Dynamically create handles based on input */}
            {isprocess && (
            <>
            {data.input && input_length > 0 && (
                <>
                    {data.input.map((_, index) => (
                        <Handle
                            id={`input-${index}`}
                            key={`input-${index}`}
                            type="target"
                            position={Position.Top}
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
                            id={`output-${index}`}
                            key={`output-${index}`}
                            type="source"
                            position={Position.Bottom}
                            isConnectable={isConnectable}
                            style={getHandleStyle(index, output_length)}
                        />
                    ))}
                </>
                )}
            </>
        )}
        </div>
    )
}


export default memo(ProcessFunctionNode);