import { memo } from "react";
import { NodeTag } from "./NodeTag";

const ConstantNode = ({ data }:{ data: { name: string } }) => {
    return (
        <div
            key={data.name}
            style={{
                border: "1px dashed black",
                borderRadius: "4px",
            }}
            className="flex items-center gap-2"
        >
            {/* Render the NodeTag with a constant type */}
            <NodeTag type="constant" />

            {/* Render the node name with appropriate text styles */}
            <div
                className="flex items-center text-xs font-medium overflow-hidden whitespace-nowrap overflow-ellipsis w-full"
                title={data.name} // Add tooltip for truncated text
            >
                {data.name}
            </div>
        </div>
    );
};

export default memo(ConstantNode);
