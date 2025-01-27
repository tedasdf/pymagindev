import { memo } from "react";
import { Call } from "../dataType";
import { NodeTag } from "./NodeTag";
import { Handle, Position } from "@xyflow/react";
import { getHandleStyle } from "../utils";


const CallNode = ({
    data
}: {
    data: Call;
}) => {

    const functionName = data.functionName;
    const input = data.args;
    const outputs = data.outputs;


    if (functionName === 'raiseerror') {
        return (
            <div
                style={{
                    width: '10px', // small rectangle width
                    height: '5px', // small rectangle height
                    borderRadius: '4px',
                    border: '1px solid black', // adding a border to make the div more visible
                }}
                className="bg-red-700"
            >
                <Handle
                    id={'function-error'}
                    key={`error`}
                    type="target"
                    position={Position.Top}
                    isConnectable={true}
                />
            </div>
        );
    }


    return (
        <div
            key={functionName}
            style={{
                backgroundColor: "rgba(145, 29, 201, 0.05)",
                border: "1px dashed black",
                borderRadius: "4px"
            }}
            className={`flex`}
        >
            {/* Display NodeTag only if the function name is not 'raiseerror' */}
        
            <NodeTag type="function" />
            <div className="flex items-center px-3 text-xs font-medium overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
                {functionName}
            </div>

            {/* Dynamically create handles based on input */}
            {input && input.length > 0 && (
                <>
                    {input.map((_, index) => (
                        <Handle
                            key={`input-${index}`}
                            type="source"
                            position={Position.Top}
                            id={`input-${index}`}
                            isConnectable={true}
                            style={getHandleStyle(index, input.length)}
                        />
                    ))}
                </>
            )}

            {/* Dynamically create handles based on outputs */}
            {outputs && outputs.length > 0 && (
                <>
                    {outputs.map((_, index) => (
                        <Handle
                            key={`output-${index}`}
                            type="source"
                            position={Position.Bottom}
                            id={`output-${index}`}
                            isConnectable={true}
                            style={getHandleStyle(index, outputs.length)}
                        />
                    ))}
                </>
            )}
        </div>
    );
}

export default memo(CallNode);

