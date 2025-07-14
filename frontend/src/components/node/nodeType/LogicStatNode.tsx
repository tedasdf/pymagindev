import { memo } from "react";
import { LogicStatement } from "../dataType"
import { CustomHandle } from "../CustomHandle";
import { Handle, Position } from "@xyflow/react";
import { getHandleStyle } from "../utils";

const LogiStatNode = ({
    data,
    isConnectable
}:{
    data: LogicStatement,
    isConnectable: boolean
}) =>{
    const Logictype = data.type // 'if' , 'for', 'while' , 'try'    
    const branches_num = data.branch ;
    const expression_num = data.expression?.length?? 0;
    const nodeWidth = 50 + branches_num * 20;
    return (
        <div
        style= {{
            width: nodeWidth,
            height: 25
          }}
        >
            <p className='text-xs'>{Logictype}</p>
            <hr className="border-t-2 border-green-500 mt-1" />
            {/* Dynamically create handles based on input */}
            <CustomHandle
                type="target"
                position={Position.Top}
                style={{ left: `10%` }}
                connectionCount={expression_num}
            />


            {branches_num > 0 && (
                <>
                    {Array.from({ length: branches_num }, (_, index) => (
                        <Handle
                            key={`branch-${index}`}
                            type="source"
                            position={Position.Bottom}
                            id={`branch-${index}`}
                            isConnectable={isConnectable}
                            style={getHandleStyle(index, branches_num)}
                        />
                    ))}
                </>
            )}

        </div>
    )
}


export default memo(LogiStatNode);