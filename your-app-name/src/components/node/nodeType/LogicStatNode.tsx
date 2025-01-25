import { memo } from "react";
import { LogicStatement } from "../dataType"
import { Handle, Position } from "@xyflow/react";
import { getHandleStyle } from "../utils";




const LogiStatNode = ({
    data,
    isConnectable
}:{
    data: LogicStatement
    isConnectable: boolean
}) =>{
    const Logictype = data.type // 'if' , 'for', 'while' , 'try'    
    const branches_num = data.process?.length?? 0 ;
    return (
        <div
        style= {{
            width: 90,
            height: 25
          }}
        >
            <p className='text-xs'>{Logictype}</p>
            <hr className="border-t-2 border-green-500 mt-1" />
            {/* Dynamically create handles based on input */}
            {data.process && branches_num > 0 && (
            <>
            {data.process.map((_, index) => (
                <Handle
                key={`input-${index}`}
                type="source"
                position={Position.Top}
                id={`input-${index}`}
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